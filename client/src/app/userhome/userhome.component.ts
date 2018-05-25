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
  username:String='';
  email: String='';
  userId: string='';
  bookingDetails: any;
  serviceId: String = localStorage.getItem('BookingServiceId');
  serviceName: string='';
  descriptionData : any;
  bookedServiceDescription: any;
  isBooking:boolean=false;
  isProceed:boolean=false;
  ServceDescriptionData:any;
  searchword:string='';
  services: any;
  serviceCount: String='';
  showResults:boolean=false;
  isResultFound:boolean=false;

  searchForm:FormGroup = new FormGroup({
    search:new FormControl(null,Validators.minLength(4)) 
  })

  serviceBookingForm:FormGroup = new FormGroup({
    serviceId: new FormControl(null),
    serviceName: new FormControl(null),
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
     data=>{
      this.username = data.username;
      this.email = data.email;
      this.userId = data._id;
     },
     error=>this._router.navigate(['/login']));

    if(this.serviceId) {
      this._servicedataService.getServiceDescription(this.serviceId)
        .subscribe(
          data=>{
            this.descriptionData = data
            this.isBooking = true;
          },
          error=>{
            swal("Ooops there was some error")
          }
        )
      }
  }

  serviceDescription(id) {
    this._servicedataService.getServiceDescription(id)
    .subscribe(
      data=>{
        this.ServceDescriptionData = data
      },
      error=>{
        swal("Ooops there was some error")
      }
    )
  }

  ngOnInit() {
  }

  onSearchClick(searchKeyword) {
    this.searchword=searchKeyword;
    if(!this.searchForm.valid){
      console.log('Invalid Form'); return;
    }
    this._servicedataService.SearchByName(this.searchword)
    .subscribe(
        data=>{this.addServices(data)
          console.log(data)},
        error=>this._router.navigate(['/home'])
      )
  }

  addServices(data){
    this.services = data;
    this.serviceCount = this.services.length;
    if(this.services.length>0) {
      this.showResults = true;
      this.isResultFound=false;
    } else {
      this.isResultFound = true;
    }
  }

  bookingLogin(id) {
    
    if(localStorage.getItem('currentUser')) {
      this.showResults= false;
      localStorage.setItem('BookingServiceId', id);
       window.location.reload();
    }
    else {
      this.showResults = false;
      swal("You Must Log In first!!!!")
      localStorage.setItem('BookingServiceId', id);
      this._router.navigate(['login'])
    }
  }

  logout(){
    this._user.logout()
    .subscribe(
      data=>{
        localStorage.removeItem('currentUser');
        localStorage.removeItem('BookingServiceId');
        this._router.navigate(['/login'])
      },
      error=>swal(error)
      )
  }
  proceed(id,serviceName) {
    this.isProceed = true;
    this.isBooking = false;
    this.serviceName = serviceName;
  }

  cancel() {
    if(confirm("Are you sure you want to Cancel this Booking")) { 
      localStorage.removeItem('BookingServiceId');
      this.isBooking = false;
    }
  }

  confirmBooking() {
    this.serviceBookingForm.value.email = this.email;
    this.serviceBookingForm.value.serviceId = this.serviceId;
    this.serviceBookingForm.value.serviceName = this.serviceName;
    console.log(this.serviceBookingForm.value);
    if(!this.serviceBookingForm.valid){
      swal('Invalid Form'); return;
    }
    this._user.bookServices(JSON.stringify(this.serviceBookingForm.value))
    .subscribe(
      data=> {
        swal("Congratulations.. Booking Successfull!!!!!!!!!!");
        this.isBooking = false;
        this.isProceed = false; 
        localStorage.removeItem('BookingServiceId');
        this._router.navigate(['/user']);
      },
      error=>swal(error)
    )
  }
  goBack() {
    this.isProceed = false;
    this.isBooking = true;
  }
  
}
