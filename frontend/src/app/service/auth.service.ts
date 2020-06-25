import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	
  isAuthenticated: Boolean = false;
  nameofuser: string = undefined;
  authToken: string = undefined;

  constructor(private http: HttpClient) { }

  storeUserCredentials(credentials: any) {
     console.log('storeUserCredentials ', credentials);
     this.isAuthenticated=true;
     this.nameofuser=credentials.name;
     this.authToken=credentials.token;
     this.createRoom("summa");
  }

  createRoom(roomcode: string) {
     console.log('room-code', roomcode);
     this.http.post('/api/users/hloo', {}).subscribe((res)=>{
          console.log('res is ', res)
      },(error) => {
          console.log('error is ', error)
      })
  }

   logOut() {
     this.isAuthenticated = false;
     this.nameofuser = undefined;
     this.authToken = undefined;
   }

   isLoggedIn(): Boolean {
     return this.isAuthenticated;
   }

   getName(): string {
     return this.nameofuser;
   }


   getToken(): string {
     return this.authToken;
   }

}
