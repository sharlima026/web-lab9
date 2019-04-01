import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import {AppComponent} from '../app.component';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {environment} from '../environment';



@Component({
  selector: 'trainer',
  templateUrl: './trainer.component.html',
  styleUrls: [ './trainer.component.css' ]
})
export class TrainerComponent implements OnInit {

  records=null;

  token=null;

  constructor(public app:AppComponent, private http:HttpClient) {}
 
  ngOnInit() {
    this.token = this.app.getToken();
    console.log(this.token);
    if(this.token!=null){

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': this.token
        })
      };
     
       this.http.get(`${environment.BASE_URL}/api/users`, httpOptions).subscribe(data=>{
        this.records = data;//set records to data received 
      })
    }
    
  }
}


