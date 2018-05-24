import { UserService} from '../services/user.service';
import { RouterModule, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthService implements CanActivate {
 constructor(private userService: UserService,private _router:Router) {}

 canActivate( next: ActivatedRouteSnapshot,state: RouterStateSnapshot)
 : Observable<boolean> | Promise<boolean> | boolean {
   if (localStorage.getItem('currentUser')) {
     return true;
   } else {
    alert("You Must Log In First")
     this._router.navigate(['./login'])
     return false;
   }
 }
}