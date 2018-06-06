import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ServiceDataService } from '../services/service-data.service';
import { Router } from '@angular/router';
import {FormGroup,FormControl,FormArray,FormBuilder,Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  // public min = Date();
  // public max = new Date(2018, 3, 21, 20, 30);
  timeSlots: any[] = [];
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
  showSearchBox: boolean=true;
  showPreview: boolean=false;
  previewData: any;
  notifications:any;
  notificationLength: String='';

  searchForm:FormGroup = new FormGroup({
    search:new FormControl(null,Validators.minLength(4)) 
  })

  serviceBookingForm:FormGroup = new FormGroup({
    serviceId: new FormControl(null),
    serviceName: new FormControl(null),
    customerName:new FormControl(null,Validators.required),
    mobileNumber: new FormControl(null,[Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10),
      Validators.maxLength(10)]),
    address: new FormControl(null, Validators.required),
    pinCode: new FormControl(null, Validators.required),
    // serviceDate: new FormControl(null, Validators.required),
    // fromTime: new FormControl(null, Validators.required),
    // toTime: new FormControl(null, Validators.required),
    email: new FormControl(null),
    timeSlots: this._formBuilder.array([ this.createTimeSlots() ])
  })

  constructor(private _user:UserService, private _router:Router, 
    private _http:HttpClient, private _servicedataService:ServiceDataService,
    private _formBuilder:FormBuilder) { 
    this._user.user()
    .subscribe(
     data=>{
      this.username = data.username;
      this.email = data.email;
      this.userId = data._id;
      this._user.getNotifications(this.email)
      .subscribe(
        data=>{
          this.notifications=data;
          this.notificationLength= data.length;
        },
        err=>console.log(err))
     },
     error=>this._router.navigate(['/login']));

    if(this.serviceId) {
      this._servicedataService.getServiceDescription(this.serviceId)
        .subscribe(
          data=>{
            this.descriptionData = data
            this.isBooking = true;
            this.showSearchBox = false;
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

  createTimeSlots(): FormGroup {
    return this._formBuilder.group({
      serviceDate: '',
      fromTime: '',
      toTime: ''
    });
  }
  
  addTimeSlots(): void {
    this.timeSlots = this.serviceBookingForm.get('timeSlots') as FormArray;
    this.timeSlots.push(this.createTimeSlots());
  }

  onSearchClick(searchKeyword) {
    this.searchword=searchKeyword;
    if(!this.searchForm.valid){
      swal('Search Keyword must contain more than 3 characters',{icon: 'warning'}); return;
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
      this.showSearchBox = true;
    }
  }

  confirmBooking() {

    this.serviceBookingForm.value.email = this.email;
    this.serviceBookingForm.value.serviceId = this.serviceId;
    this.serviceBookingForm.value.serviceName = this.serviceName;
    // if (this.serviceBookingForm.value.fromTime > this.serviceBookingForm.value.toTime) {
    //   swal("Invalid Time Slot Range"); return;
    // }
    if(!this.serviceBookingForm.valid){
      swal('Invalid Form'); return;
    }
    this._user.bookServices(JSON.stringify(this.serviceBookingForm.value))
    .subscribe(
      data=> {this.previewData = data
        this.previewData = Array.of(this.previewData)
        console.log(data)
        if(data == "booked") {
          swal("This time slot already booked. Please choose another one.",{icon: "warning"});
        } else {
          swal("Congratulations.. Booking Successfull!!!!!!!!!!");
          
          console.log(this.previewData)
        this.isBooking = false;
        this.isProceed = false; 
        this.showPreview = true;
        // this.showSearchBox = true;
        localStorage.removeItem('BookingServiceId');
        // this._router.navigate(['/user']);
        }
        
      },
      error=>alert(error)
    )
  }
  goBack() {
    this.isProceed = false;
    this.isBooking = true;
  }
  clearMsg() {
    this.isResultFound = false;
    this.showResults = false;
  }

  closePreview() {
    this.showPreview = false;
    this.showSearchBox = true;
  }

  // function mobileNumberValidate(control: formControl) {
  //   debugger
  //   return {error: true};

  // }

  
}
