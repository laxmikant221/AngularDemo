import { UserService} from '../services/user.service';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AdminGuard implements CanActivate {
 constructor(private userService: UserService,private _router:Router) {}

 canActivate( next: ActivatedRouteSnapshot,state: RouterStateSnapshot)
 : Observable<boolean> | Promise<boolean> | boolean {
   if (localStorage.getItem('adminUser')) {
     return true;
   } else {
    alert("You Don't Have Permission to View This Page")
     this._router.navigate(['./adminlogin'])
     return false;
   }
 }
}