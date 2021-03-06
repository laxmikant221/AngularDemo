import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { UserService } from '../services/user.service';
import { ServiceDataService } from '../services/service-data.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css']
})
export class ManageServicesComponent implements OnInit {
  services: any;
  serviceCount: String='';
  formFlag: boolean= false;
  url: '';
  filesToUpload: Array<File> = [];
  filterHour: boolean=false;
  filterDay:boolean = false;
  filterMonth: boolean = false;
  constructor(private _router:Router, private _servicedataService:ServiceDataService,
    private _http:HttpClient, private _user:UserService) {
    this._servicedataService.listServices()
    .subscribe(
      data=>this.addServices(data),
      error=>this._router.navigate(['/manage-services'])
      )
  }

  ngOnInit() {
  }

  filterCheckBoxDay(){
    this.filterDay = !this.filterDay;
  }
  filterCheckBoxHour(){
    this.filterHour = !this.filterHour;
  }
  filterCheckBoxMonth(){
    this.filterMonth = !this.filterMonth;
  }
  addServices(data){
    this.services = data;
    this.serviceCount = this.services.length;
  }
  openServiceForm() {
    this.formFlag = true;
  }
  adminLogout(){
    this._user.adminLogout()
    .subscribe(
      data=>{
        localStorage.removeItem('adminUser');
        this._router.navigate(['/adminlogin'])
      },
      error=>console.error(error)
      )
  }

  serviceForm:FormGroup = new FormGroup({
    serviceName:new FormControl(null,Validators.required),
    serviceCategory: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    zipCode: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    price: new FormGroup ({
      priceHour: new FormControl(null, Validators.required),
      priceDay: new FormControl(null, Validators.required),
      priceMonth: new FormControl(null, Validators.required)
    }),
    image: new FormControl(null, Validators.required)
  })

  saveServices() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    for(let i =0; i < files.length; i++){
      formData.append("uploads[]", files[i], files[i]['name']);
    }
    formData.append("forminput", JSON.stringify(this.serviceForm.value));
    console.log('form data variable :   '+ formData.toString());
    this._http.post('http://127.0.0.1:3000/api/saveServices', formData)
    .subscribe(files =>{  
      swal("New service Added Successfully", {
            icon: "success",
          })
        this.formFlag = false
    },
    error=>{  
      swal("there was some error")});
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(fileInput.target.files[0]);
      reader.onload = (fileInput) => {
        this.url = reader.result;
      }
    }
  }

  deleteServiceById(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover it again!!!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._servicedataService.deleteServiceById(id)
        .subscribe(
          data=> {swal("Poof! Service deleted Successfully!!!", {
            icon: "success",
          });},
          error=> swal("Sorry, there was some eroor"))
      } 
    });
  }
  
}