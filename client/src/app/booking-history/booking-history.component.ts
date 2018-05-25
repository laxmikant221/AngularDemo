import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import { ServiceDataService } from '../services/service-data.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
username:string='';
email:string='';
id:string='';
bookingDetails: any;
ServceDescriptionData:any;
bookingInfo:any;

  updateBookingForm:FormGroup = new FormGroup({
    customerName:new FormControl(null,Validators.required),
    mobileNumber: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    pinCode: new FormControl(null, Validators.required),
    timeSlot: new FormControl(null, Validators.required)
  })
  constructor(private _user:UserService, private _router:Router, 
    private _http:HttpClient, private _servicedataService:ServiceDataService,
    private route:ActivatedRoute) {
    this.id= this.route.snapshot.params['userId']; 
    this._user.user()
    .subscribe(
     data=>{
      this.username = data.username;
      this.email = data.email;
      this._user.userBookings(this.email)
      .subscribe(
      data=> {
        this.bookingDetails = data;
      },
      error=>this._router.navigate(['/user']))
    },
     error=>this._router.navigate(['/user']));

  }
  addData(data) {
    
  }

  ngOnInit() {

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
        swal("Ooops there was some error")
      }
    )
  }

  cancelBooking(id) {
    swal({
      title: "Are you sure?",
      text: "Once canceled, you will have to book it again!!!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._user.cancelBooking(id)
        .subscribe(
          data=> {
            swal("Poof! Your Booking Has Been Canceled!!!", {
            icon: "success",});
            window.location.reload();
        },
          error=> swal("Sorry, there was some eroor"))
      } 
     
    });
  }

  getBookingInfo(id) {
    this._servicedataService.getBookingInfoById(id)
    .subscribe(
      data=>{
        this.bookingInfo= data
        console.log(this.bookingInfo)},
        error=>{
          swal("Oooops Something Went Wrong.....")
          this._router.navigate(['/manage-services'])}
          )
  }

  updateBooking(id) {
    this._servicedataService.updateBookingById(this.updateBookingForm.value,id)
    .subscribe(data =>{  
      swal("Booking Updated Successfully");
    },
    error=>{  
      swal("there was some error")});
  }

  logout(){
    this._user.logout()
    .subscribe(
      data=>{
        localStorage.removeItem('currentUser');
        localStorage.removeItem('BookingServiceId');
        this._router.navigate(['/login'])
      },
      error=>console.error(error)
      )
  }
}
