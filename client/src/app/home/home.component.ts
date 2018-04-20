import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { ServiceDataService } from '../services/service-data.service';
import {MatSort, MatSortable, MatTableDataSource } from '@angular/material';


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
  // id:String='';
  descriptionFlag: boolean = false;
  descriptionData: any;

  searchForm:FormGroup = new FormGroup({
    search:new FormControl(null,Validators.minLength(5)) 
  })

  constructor(private _router:Router, private _servicedataService:ServiceDataService){

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

  serviceDescription(id) {
    // this.id = id;
    this._servicedataService.getServiceDescription(id)
    .subscribe(
        data=>{
          this.descriptionData = data
          this.descriptionFlag =true
          this.showResults = false;
        },
        error=>{
          console.log("Ooops there was some error")
        }
      )
  }

}
