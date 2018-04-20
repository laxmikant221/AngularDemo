import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { ServiceDataService } from '../services/service-data.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
@Component({
  selector: 'app-edit-services',
  templateUrl: './edit-services.component.html',
  styleUrls: ['./edit-services.component.css']
})
export class EditServicesComponent implements OnInit {
  id = '';
  service: any;
  
  constructor(private _router:Router, 
    private _servicedataService:ServiceDataService, private _http:HttpClient,
    private route:ActivatedRoute) {
    this.id= this.route.snapshot.params['id'];
    console.log(this.id);
    this._servicedataService.getServiceById(this.id)
    .subscribe(
      data=>{
        this.service= data
        console.log(this.service)},
        error=>{
          alert("Oooops Something Went Wrong.....")
          this._router.navigate(['/manage-services'])}
          )
  }

  ngOnInit() {
  }

  editServiceForm:FormGroup = new FormGroup({
    sName:new FormControl(null,Validators.required),
    sCategory: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    zipCode: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    price: new FormGroup ({
      priceHour: new FormControl(null, Validators.required),
      priceDay: new FormControl(null, Validators.required),
      priceMonth: new FormControl(null, Validators.required),

    })
  })

  updateService() {
    this._servicedataService.updateServiceById(this.editServiceForm.value,this.id)
    .subscribe(data =>{  
      alert("Service Updated Successfully")
      this._router.navigate(['/manage-services'])
    },
    error=>{  
      alert("there was some error")});
  }
}
