import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  loginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required)
  });

  constructor(private _router:Router, private _user:UserService) {
  }
  ngOnInit() {
  }

  moveToRegister(){
    this._router.navigate(['/register']);
  }

  adminLogin(){
    if(!this.loginForm.valid){
      console.log('Invalid');return;
    }
    this._user.adminLogin(JSON.stringify(this.loginForm.value))
    .subscribe(
      data=>{
        localStorage.setItem('adminUser', JSON.stringify(this.loginForm.value));
        this._router.navigate(['/admin']);
      } ,
      error=>console.error(error)
      )
  }
}
