import { Injectable } from '@angular/core';
import { Signup, Signin } from '../../shared/signup';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  data1: Signup;
  data2: Signin;
    constructor() {
        
    }
    signupstore(data1) {
        console.log(data1); 
        
    }
    signinstore(data2) {
        console.log(data2); 
        
    }

}
