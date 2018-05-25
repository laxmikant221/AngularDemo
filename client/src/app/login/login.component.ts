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
  }

  ngOnInit() {
  }

  moveToRegister(){
    this._router.navigate(['/register']);
  }

  login(){
    if(!this.loginForm.valid){
      swal("Ivalid Inut", {icon: "warning"});return;
    }
    this._user.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data=>{
        localStorage.setItem('currentUser', JSON.stringify(this.loginForm.value));
        swal("Congrats!! You have successfully logged in...", {icon: "success"})
        this._router.navigate(['/user']);
      } ,
      error=>swal("User name or password do not match!!!", {icon: "warning"} )
      )
  }

}
