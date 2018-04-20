import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ServiceDataService {

  constructor(private _http:HttpClient) { }
  listServices(){
    return this._http.get('http://127.0.0.1:3000/api/listservices',{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  SearchByName(searchKeyword:any){
    return this._http.get('http://127.0.0.1:3000/api/searchbyname',{
      params: { searchKeyword: searchKeyword},
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    })

  }
  getServiceById(id:any){
    return this._http.get('http://127.0.0.1:3000/api/getServiceById',{
      params: { id: id},
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    })

  }

  updateServiceById(body:any, id){
    return this._http.put('http://127.0.0.1:3000/api/updateServiceById',body,{
      params: {id: id},
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  deleteServiceById(id:any) {
    return this._http.delete('http://127.0.0.1:3000/api/deleteServiceById',{
      params: {id: id},
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getServiceDescription(id:any) {debugger
    return this._http.get('http://127.0.0.1:3000/api/getServiceDescription',{
      params: { id: id},
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

}
