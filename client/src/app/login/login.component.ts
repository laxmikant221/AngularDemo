import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required)
  });

  constructor(private _router:Router, private _user:UserService) {
    // this._user.isLoggedIn = false;
    // this._user.isAnyLoggedIn = false;
  }

  ngOnInit() {
  }

  moveToRegister(){
    this._router.navigate(['/register']);
  }

  login(){
    // console.log(this.loginForm.value.role);
    // var role = this.loginForm.role;
    if(!this.loginForm.valid){
      console.log('Invalid');return;
    }
    this._user.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data=>{
        console.log(this._user.isAnyLoggedIn);
        this._user.isLoggedIn = true;
        this._user.isAnyLoggedIn = true;
        console.log(this._user.isAnyLoggedIn);
        this._router.navigate(['/user']);
      } ,
      error=>console.error(error)
      )
  }

}
