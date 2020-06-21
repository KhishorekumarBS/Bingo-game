import { Injectable } from '@angular/core';
import { Signup, Signin } from '../../shared/signup';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  data1: Signup;
  data2: Signin;
  rootURL = 'http://localhost:9000';
    constructor(private http: HttpClient,private router: Router) {
        
    }

    signupstore(signup_data) {
      console.log(signup_data); 
      this.http.post('/api/create', {'email':signup_data.EMAILADDRESS,'name':signup_data.USERNAME,'password':signup_data.PASSWORD}).subscribe((res)=>{
          console.log('res is ', res)
      },(error) => {
          console.log('error is ', error)
      })
    }

    signinstore(signin_data) {
      this.http.post('/api/login', {'email':signin_data.EMAILADDRESS,'password':signin_data.PASSWORD}).subscribe((res)=>{
          console.log('res is ', res);
    
          //if(res.auth==="1"){
          this.router.navigate(['/bingocard'])
          //}
      },(error) => {
          console.log('error is ', error)
      })        
    }
}
