import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
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
  constructor(private _router:Router, private _servicedataService:ServiceDataService,
    private _http:HttpClient) {
    this._servicedataService.listServices()
    .subscribe(
      data=>this.addServices(data),
      error=>this._router.navigate(['/manage-services'])
      )
  }

  ngOnInit() {
  }

  addServices(data){
    this.services = data;
    this.serviceCount = this.services.length;
    console.log(JSON.stringify(data));
  }
  openServiceForm() {
    this.formFlag = true;
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
      priceMonth: new FormControl(null, Validators.required),

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
      alert("New service Added Successfully")
      if(!confirm("Do you want to add more services????")) {
        this.formFlag = false
      }
      
    },
    error=>{  
      alert("there was some error")});
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
    if(confirm("Are you sure you want to delete")) { 
      this._servicedataService.deleteServiceById(id)
        .subscribe(
          data=>{
            alert("Service deleted Successfully....")
            this._router.navigate(['/manage-services'])
          },
          error=>alert("Ooops.. there was some error")
        )
    }
  }
}