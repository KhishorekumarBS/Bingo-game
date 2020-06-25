import { Injectable } from '@angular/core';
import { Signup, Signin } from '../../shared/signup';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  data1: Signup;
  data2: Signin;
  rootURL = 'http://localhost:9000';
    constructor(private http: HttpClient,private router: Router,private authService: AuthService) {
        
    }

    signupstore(signup_data) {
      console.log(signup_data); 
      this.http.post('/api/users/signup', {'username':signup_data.EMAILADDRESS,'name':signup_data.USERNAME,'password':signup_data.PASSWORD}).subscribe((res)=>{
          console.log('res is ', res)
      },(error) => {
          console.log('error is ', error)
      })
    }

    signinstore(signin_data) {
      this.http.post('/api/users/login', {'username':signin_data.EMAILADDRESS,'password':signin_data.PASSWORD}).subscribe((res)=>{
          console.log('res is ', res);
          this.authService.storeUserCredentials(res);
          //if(res.auth==="1"){
          //this.router.navigate(['/bingocard'])
          //}
      },(error) => {
          console.log('error is ', error)
      })        
    }
}
