import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	//Dont access these variables directly. For accessing these we have helper functions.
  isAuthenticated: Boolean = false;
  nameofuser: string = undefined;
  authToken: string = undefined;
  logged_out=true;
 

  constructor(private http: HttpClient,private router: Router) { }

  storeUserCredentials(credentials: any) {
     console.log('storeUserCredentials ', credentials);
     this.isAuthenticated=true;
     this.nameofuser=credentials.name;
     this.authToken=credentials.token;
  }
  //return this.http.post('/api/users/signup', {'username':signup_data.EMAILADDRESS,'name':signup_data.USERNAME,'password':signup_data.PASSWORD});
  createRoom() {
     return this.http.post('/api/createroom', {})
  }
  
 
   logOut() {
     this.isAuthenticated = false;
     this.nameofuser = undefined;
     this.authToken = undefined;
     return this.logged_out;

     
   }

   isLoggedIn(): Boolean {
     return this.isAuthenticated;
   }
//Whenever u want the name, u can call this function . Remember that all these works only after login.
   getName(): string {
     return this.nameofuser;
   }


   getToken(): string {
     return this.authToken;
     //console.log(this.authToken)
   }

}
