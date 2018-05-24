import { UserService} from '../services/user.service';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";
import 'rxjs/add/operator/toPromise';
@Injectable()
export class RemainGuard implements CanActivate {

 constructor(private _user: UserService, private _router:Router) {
}


canActivate ( next: ActivatedRouteSnapshot,state: RouterStateSnapshot )
: Observable<boolean> | Promise<boolean> | boolean {
  if (!(localStorage.getItem('adminUser') || localStorage.getItem('currentUser'))) {
     return true;
   } else {
    alert("You Must Log Out First")
    if(localStorage.getItem('adminUser'))
    this._router.navigate(['./admin']) 
  else this._router.navigate(['./user'])
    return false;
   }
 
 }
}