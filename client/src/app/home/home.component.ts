import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { ServiceDataService } from '../services/service-data.service';
import {MatSort, MatSortable, MatTableDataSource } from '@angular/material';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  services: any;
  serviceCount: String='';
  searchword;
  showResults:boolean=false;
  isResultFound:boolean=false;
  descriptionData: any;

  searchForm:FormGroup = new FormGroup({
    search:new FormControl(null,Validators.minLength(4)) 
  })

  constructor(private _router:Router, private _user: UserService,
   private _servicedataService:ServiceDataService){

  }

  ngOnInit() {

  }

  addServices(data){
    this.services = data;
    this.serviceCount = this.services.length;
    if(this.services.length>0) {
      this.showResults = true;
      this.isResultFound=false;
    } else {
      this.isResultFound = true;
    }
  }
  
  onSearchClick(searchKeyword) {
    this.searchword=searchKeyword;
    if(!this.searchForm.valid){
      console.log('Invalid Form'); return;
    }
    this._servicedataService.SearchByName(this.searchword)
    .subscribe(
        data=>{this.addServices(data)},
        error=>this._router.navigate(['/home'])
      )
  }

  clearMsg() {
    this.isResultFound = false;
    this.showResults = false;
  }

  serviceDescription(id) {
    this._servicedataService.getServiceDescription(id)
    .subscribe(
        data=>{
          this.descriptionData = data
        },
        error=>{
          console.log("Ooops there was some error")
        }
      )
  }

  bookingLogin(id) {
    
    if(localStorage.getItem('currentUser')) {
      localStorage.setItem('BookingServiceId', id);
      this._router.navigate(['/user'])
    }
    else {
      swal("You Must Log In first!!!!")
      localStorage.setItem('BookingServiceId', id);
      this._router.navigate(['login'])
    }
  }

}
