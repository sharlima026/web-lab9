import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PageEvent} from '@angular/material';
import {environment} from '../environment';
//endpont url

//standard component boilerplate code
@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  
  records;
  //default for pagination
  length = 700;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private http:HttpClient) { }//inject module into component

  ngOnInit() {
    //use module to perfrom ajax, must use arrow anonymous function
    this.http.get(`${environment.BASE_URL}/api/pokemon`).subscribe(data=>{
      this.records = data;//set records to data received 
    })
  }

  getServerData(pageEvent){
    console.log(pageEvent);
    this.http.get(`${environment.BASE_URL}/api/pokemon?limit=${pageEvent.pageSize}&offset=${pageEvent.pageIndex}`).subscribe(data=>{
      this.records = data;//set records to data received 
    })
  }
}