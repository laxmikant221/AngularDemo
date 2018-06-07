import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import { ServiceDataService } from '../services/service-data.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {

  username:string='';
  email:string='';
  id:string='';
  bookingDetails: any;
  ServceDescriptionData:any;

  constructor(private _user:UserService, private _router:Router, 
    private _http:HttpClient, private _servicedataService:ServiceDataService,
    private route:ActivatedRoute) {
    this.id= this.route.snapshot.params['userId']; 
    this._user.user()
    .subscribe(
     data=>{
      this.username = data.username;
      this.email = data.email;
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

