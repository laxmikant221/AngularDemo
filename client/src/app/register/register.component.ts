import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    username:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
    cpass:new FormControl(null,Validators.required),
    // adminCode: new FormControl(null)
  })
  constructor(private _router:Router, private _userService:UserService) { }

  ngOnInit() {
  }

  moveToLogin(){
    this._router.navigate(['/login']);
  }

  register(){
    if(!this.registerForm.valid || 
      (this.registerForm.controls.password.value 
        != this.registerForm.controls.cpass.value)){
      alert("Invalid Form", {icon: "warning"}); return;
    }

    this._userService.register(JSON.stringify(this.registerForm.value))
    .subscribe(
      data=> {
        if(data == "present") {
          swal("This email is already Registered", {icon: "warning"})
        } else { 
          swal({
            title:"Congrats Registration Successfull!!",
            text: "A verification link has been sent to your email.",
            icon: "success"}); 
        this._router.navigate(['/login']);
      }},
      error=>console.error(error)
      )
  }

//   function emailDomainValidator(control: FormControl) { 
//   let email = control.value; 
//   if (email && email.indexOf("@") != -1) { 
//     let [_, domain] = email.split("@"); 
//     if (domain !== "bestpeers.com") { 
//       return {
//         emailDomain: {
//           parsedDomain: domain
//         }
//       }
//     }
//   }
//   return null; 
// }
}
