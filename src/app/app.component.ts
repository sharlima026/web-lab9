import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {LoginComponent} from './login/login.component';
import { HttpClient } from '@angular/common/http';
import {environment} from './environment';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  currId= 1;
  username="";
  password="";
  public token:any=null;
  loggedIn=false;
  
  constructor(private router: Router,  public dialog: MatDialog, private http:HttpClient) {}
 

  public getToken(){
    return this.token;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      data: {username: "", password: ""}
    });//opens a LoginComponent dialog and passes data to it

    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed', data);
       this.http.post(`${environment.BASE_URL}/auth`, data, {headers:{'Content-Type': 'application/json'}}).subscribe(response=>{
            this.token = response.access_token;//got token from successful login
            this.loggedIn = true;
            console.log("logged in with token", response);
          })
          this.router.navigate(['/pokemon/1']);//redirects page
    });
  }
}