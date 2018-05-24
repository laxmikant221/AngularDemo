import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: any;
  userCount: String='';
  constructor(private _user:UserService, private _router:Router) { 
    this._user.listUsers()
    .subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/manage-users'])
      )
  }
  addName(data){
    this.users = data; 
    this.userCount = this.users.length;
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
  ngOnInit() {
  }

}
