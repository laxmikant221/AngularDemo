import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ServiceDataService } from '../services/service-data.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-verfiy-user',
  templateUrl: './verfiy-user.component.html',
  styleUrls: ['./verfiy-user.component.css']
})
export class VerfiyUserComponent implements OnInit {
  verifyToken: string='';
  constructor(private _user:UserService, private _router:Router,
   private route: ActivatedRoute) {

    this.verifyToken = this.route.snapshot.params['verifyToken'];
    console.log(this.route.snapshot._routerState.url);
    console.log(this.verifyToken);
    this._user.verifyUser(this.verifyToken)
    .subscribe(
      data=>{
        this._router.navigate(['/login']);
        swal("Your Link has been verified successfully...")
      },
      error=> {
        this._router.navigate(['/register']);
        swal("Link is expired");
      })
    
  } 
  

  ngOnInit() {
  }

}
