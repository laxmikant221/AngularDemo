import { UserService} from '../services/user.service';
import { RouterModule, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthService implements CanActivate {
 constructor(private userService: UserService,private _router:Router) {}

 canActivate( next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   if (this.userService.isLoggedIn) {
   	console.log(this.userService.isLoggedIn);
   	// this._router.navigate(['./adminlogin']);
     return true;
   } else {
     // window.alert("You don't have permission to view this page");
     this._router.navigate(['./login']);
     return false;
   }
 }
}


// export class notloggedIn implements CanActivate {
//   constructor(private _user: UserService,private _router:Router) {};

//   canActivate() {
// debugger
//     if (this._user.isLoggedIn) {

//        window.alert("You don't have permission to view this page");
//       this._router.navigate(['/home'])
//       return false;
//     } else {
//       return true;
//     }
//   }
// }

// import {CanActivate} from "@angular/router";

// class AlwaysAuthGuard implements CanActivate {
//   canActivate() {
//     console.log("AlwaysAuthGuard");
//     return true;
//   }
// }