import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ServiceDataService } from '../services/service-data.service';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  users: any;
  username:String='';
  email: String='';
  serviceList: any;
  bookingDetails: any;
  // url: '';
  // servicesCount: String='';
  serviceId: String = localStorage.getItem('BookingServiceId');
  descriptionData : any;
  bookedServiceDescription: any;
  isBooking:boolean=false;
  isProceed:boolean=false;
  isHistory:boolean=false;
  i:number=0;
  bookArray:any[]=[];
  ServceDescriptionData:any;
  completed_requests:number=0;

  serviceBookingForm:FormGroup = new FormGroup({
    serviceId: new FormControl(null),
    customerName:new FormControl(null,Validators.required),
    mobileNumber: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    pinCode: new FormControl(null, Validators.required),
    timeSlot: new FormControl(null, Validators.required),
    email: new FormControl(null)
  })

  constructor(private _user:UserService, private _router:Router, 
    private _http:HttpClient, private _servicedataService:ServiceDataService) { 
    this._user.user()
    .subscribe(
     data=>this.addName(data),
     error=>this._router.navigate(['/login']));

    if(this.serviceId) {
      this._servicedataService.getServiceDescription(this.serviceId)
        .subscribe(
          data=>{
            this.descriptionData = data
            this.isBooking = true;
          },
          error=>{
            console.log("Ooops there was some error")
          }
        )
      }
  }

  serviceDescription(id) {
    console.log(id);
    this._servicedataService.getServiceDescription(id)
    .subscribe(
      data=>{
        this.ServceDescriptionData = data
        console.log(this.ServceDescriptionData)
      },
      error=>{
        console.log("Ooops there was some error")
      }
    )
  }

  addName(data){
    this.username = data.username;
    this.email = data.email;
  }
  // addServiceList(data) {
  //   this.serviceList = data;
  //   this.servicesCount = this.serviceList.length;
  // }

  ngOnInit() {
  }

  logout(){
    this._user.logout()
    .subscribe(
      data=>{
        localStorage.removeItem('currentUser');
        localStorage.removeItem('BookingServiceId');
        this._user.isLoggedIn = false;
        this._user.isAnyLoggedIn = false;
        this._router.navigate(['/login'])
      },
      error=>console.error(error)
      )
  }

  viewHistory(email) {
    var i:number;
    this._user.userBookings(this.email)
    .subscribe(
      data=> {
        this.bookingDetails = data;
        this.isHistory = true;
        console.log(this.bookingDetails);
        for (i=0;i<this.bookingDetails.length;i++) {
          this._servicedataService.getServiceDescription(this.bookingDetails.serviceId)

            this.bookArray.push(data);
            // completed_requests++;
            // if (completed_requests == this.bookingDetails.length) {
            // All download done, process responses array
            console.log(bookArray);
          // }
        
        } 
      },
      error=>this._router.navigate(['/user']))
    // for(this.i=0;this.i<this.bookingDetails.length;this.i++) {
    //   this._servicedataService.getServiceDescription(this.bookingDetails.serviceId)
    //   .subscribe(
    //     data=>{
    //       this.isHistory = true;
    //       this.bookedServiceDescription = data;
    //       this.bookArray.push(this.bookedServiceDescription);
    //     },
    //     error=>{
    //       console.log("Ooops there was some error")
    //     }
    //   )
    // }

  }

  proceed(id) {
    this.isProceed = true;
    this.isBooking = false;

  }
  cancelBooking() {
    if(confirm("Are you sure you want to Cancel this Booking")) { 
      localStorage.removeItem('BookingServiceId');
      this.isBooking = false;
    }
  }

  confirmBooking() {
    this.serviceBookingForm.value.email = this.email;
    this.serviceBookingForm.value.serviceId = this.serviceId;
    console.log(this.serviceBookingForm.value);
    if(!this.serviceBookingForm.valid){
      console.log('Invalid Form'); return;
    }
    this._user.bookServices(JSON.stringify(this.serviceBookingForm.value))
    .subscribe(
      data=> {
        alert("Booking Successfull!!!!!!!!");
        this.isBooking = false;
        this.isProceed = false; 
        this._router.navigate(['/user']);
      },
      error=>console.error(error)
    )
  }
  goBack() {
    this.isProceed = false;
    this.isBooking = true;
  }
}
