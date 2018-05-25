import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ServiceDataService } from '../services/service-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any;
  username:String='';
  email: String='';
  bookedServices: any;
  ServceDescriptionData:any;
  constructor(private _user:UserService, private _router:Router, 
    private _servicedataService:ServiceDataService) 
  { 
    this._user.admin()
    .subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/adminlogin'])
      )
    this._user.serviceBooked()
    .subscribe(
      data=>{
        this.bookedServices=data
        console.log(data[0].bookings)
      },
      error=>swal("oops there was some error")
      )
  }

  addName(data){
    this.username = data.username;
    this.email = data.email;
  }
  ngOnInit() {
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

}
