import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
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
  users: any;
  username:String='';
  email: String='';
  serviceList: any;
  url: '';
  servicesCount: String='';
  filesToUpload: Array<File> = [];

  servicesForm:FormGroup = new FormGroup({
    sName:new FormControl(null,Validators.required),
    sCategory: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    zipCode: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required)
  })

  constructor(private _user:UserService, private _router:Router, 
    private _http:HttpClient) { 
    this._user.user()
    .subscribe(
     data=>this.addName(data),
     error=>this._router.navigate(['/login']));
  }

  addName(data){
    this.username = data.username;
    this.email = data.email;
    console.log(data);
  }
  addServiceList(data) {
    this.serviceList = data;
    this.servicesCount = this.serviceList.length;
    console.log(data);
  }

  ngOnInit() {
  }

  saveServices(){
    console.log(this.servicesForm.value);
    if(!this.servicesForm.valid){
      console.log('Invalid Form'); return;
    }
    this._user.saveServices(JSON.stringify(this.servicesForm.value))
    .subscribe(
      data=> {
        console.log(data); 
        this._router.navigate(['/user']);},
        error=>console.error(error)
        )
  }

  logout(){
    this._user.logout()
    .subscribe(
      data=>{
        console.log(data);
        this._user.isLoggedIn = false;
        this._user.isAnyLoggedIn = false;
        this._router.navigate(['/login'])
      },
      error=>console.error(error)
      )
  }
  imageForm:FormGroup = new FormGroup({
    sName:new FormControl(null,Validators.required),
    sCategory: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    zipCode: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    image: new FormControl(null, Validators.required)})

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    for(let i =0; i < files.length; i++){
      formData.append("uploads[]", files[i], files[i]['name']);
    }
    formData.append("forminput", JSON.stringify(this.imageForm.value));
    console.log('form data variable :   '+ formData.toString());
    this._http.post('http://127.0.0.1:3000/users/upload', formData)
    .subscribe(files => console.log('files', files));
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(fileInput.target.files[0]); 
      reader.onload = (fileInput) => {
        this.url = reader.result;
      }
    }
  }
  viewHistory(email) {
    this._user.UserServiceList(this.email)
    .subscribe(
      data=>{this.addServiceList(data);console.log(this.email);},
      error=>this._router.navigate(['/user']))

  }
}
