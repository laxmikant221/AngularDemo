import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  constructor(private _http:HttpClient) { }

  register(body:any){
    return this._http.post('http://127.0.0.1:3000/api/register',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login(body:any){
    return this._http.post('http://127.0.0.1:3000/api/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  adminLogin(body:any){
    return this._http.post('http://127.0.0.1:3000/api/adminlogin',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  user(){
    return this._http.get('http://127.0.0.1:3000/api/user',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  admin(){
    return this._http.get('http://127.0.0.1:3000/api/admin',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  logout(){
    return this._http.get('http://127.0.0.1:3000/api/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  adminLogout(){
    return this._http.get('http://127.0.0.1:3000/api/adminlogout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  listUsers(){
    return this._http.get('http://127.0.0.1:3000/api/listusers',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })

  }

  bookServices(body:any){
    return this._http.post('http://127.0.0.1:3000/api/bookServices',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  userBookings(email:any){
    return this._http.get('http://127.0.0.1:3000/api/userBookings',{
      params: { email: email},
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    })

  }
  serviceBooked(){
    return this._http.get('http://127.0.0.1:3000/api/serviceBooked',{
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
  cancelBooking(id) {
    return this._http.delete('http://127.0.0.1:3000/api/cancelBooking',{
      params: {id: id},
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  verifyUser(email: any){
  return this._http.get('http://127.0.0.1:3000/api/verify/'+email,{
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  getNotifications(email: any){
    return this._http.get('http://127.0.0.1:3000/api/notifications/'+email,{
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
