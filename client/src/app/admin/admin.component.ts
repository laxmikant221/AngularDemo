import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // constructor() { }
  users: any;
  username:String='';
  email: String='';
  constructor(private _user:UserService, private _router:Router) { 
    this._user.isAdminLoggedIn = true;
    this._user.admin()
    .subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/adminlogin'])
      )
  }

  addName(data){
    this.username = data.username;
    this.email = data.email;
    console.log(data);
  }
  ngOnInit() {
  }

  adminLogout(){
    this._user.adminLogout()
    .subscribe(
      data=>{
        console.log(data);
        this._user.isAdminLoggedIn = false;
        this._user.isAnyLoggedIn = false;
        this._router.navigate(['/adminlogin'])
      },
      error=>console.error(error)
      )
  }

}
