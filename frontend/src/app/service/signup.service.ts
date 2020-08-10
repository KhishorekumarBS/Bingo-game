import { Injectable } from '@angular/core';
import { Signup, Signin, ResponseType } from '../../shared/signup';
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

    
/*    signupstore(signup_data): Observable<string> {
      console.log(signup_data); 
      this.http.post('/api/users/signup', {'username':signup_data.EMAILADDRESS,'name':signup_data.USERNAME,'password':signup_data.PASSWORD}).subscribe((res)=>{
          console.log('res is ', res);
          this.router.navigate(['login']);
          //this.canshow=true;
          
          console.log(res['status']);
          return res['status'];
      },(error) => {
          console.log('error is ', error);
          return error.name;
      })
    }*/

    signupstore(signup_data) {
      //console.log(signup_data); 
      return this.http.post('/api/users/signup', {'username':signup_data.EMAILADDRESS,'name':signup_data.USERNAME,'password':signup_data.PASSWORD});
    }


    signinstore(signin_data) {
      return this.http.post('/api/users/login', {'username':signin_data.EMAILADDRESS,'password':signin_data.PASSWORD})
        /*.subscribe((res)=>{
          console.log('res is ', res);
          //This line stores the user name, token in auth.service 
          
          //console.log(res['success']);
          if(res['success']==true){
            //console.log(res['success']);
          this.router.navigate(['/roomcode'])
          }
          return res['status'];
      },(error) => {
          console.log('error is ', error)
      })    */    
    }
}
