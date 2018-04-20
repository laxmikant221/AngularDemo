import { UserService} from '../services/user.service';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";
import 'rxjs/add/operator/toPromise';
@Injectable()
export class RemainGuard implements CanActivate {

 constructor(private _user: UserService, private _router:Router) {
  console.log(this._user.isLoggedIn);
}


canActivate ( 
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot 
  ): Observable<boolean> | Promise<boolean> | boolean {
 // if (!this._user.isLoggedIn) {
 //    this._router.navigate(['./login']);
    return true;
    
  // } 
     // window.alert("You don't have permission to view this page");
     // debugger
     // console.log(this._user.isLoggedIn);
     // this._router.navigate(['./user']);
     // return false;

   // {
   //   // window.alert("You don't have permission to view this page");
   //   // this._router.navigate(['./adminlogin'])
   //   return true;
   // }
 }
}