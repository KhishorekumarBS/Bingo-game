import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../service/validation.service';
import { SignupService } from '../service/signup.service';

import { Signup, Signin } from '../../shared/signup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 @ViewChild('fform') signupFormDirective;
 @ViewChild('sform') signinFormDirective;
  signupForm: FormGroup;
  signup: Signup ; 
  submit_signup= false;
  signinForm: FormGroup;
  signin: Signin;
  submit_signin=false;
  
  
   constructor(private fb: FormBuilder,private sb: FormBuilder, private signupservice: SignupService) {
    this.createsignupForm();
    this.createsigninForm();
  }

  ngOnInit() {
  }

  createsignupForm() {
    this.signupForm = this.fb.group({
      EMAILADDRESS:  ['', [Validators.required, Validators.email]],
      USERNAME:  ['', Validators.required ],
      PASSWORD:  ['', [Validators.required,ValidationService.password]],
      REPEATPASSWORD:  ['', [Validators.required]],
      
    },{
  validator: [
    ValidationService.match('PASSWORD', 'REPEATPASSWORD'),
  ]
});
  }

  onSubmitsignup() {
   this.submit_signup=true;     
   if (this.signupForm.invalid) {
        return;
    }
    else{
    this.signup = this.signupForm.value;
    
    this.signupservice.signupstore(this.signup);
    this.submit_signup=false;
     this.signupForm.reset();
     }
     
  }
  createsigninForm() {
    this.signinForm = this.sb.group({
      EMAILADDRESS:  ['', [Validators.required, Validators.email]],
      PASSWORD:  ''
});
  }
  onSubmitsignin() {
   this.submit_signin=true;     
   if (this.signinForm.invalid) {
        return;
    }
    else{
    this.signin = this.signinForm.value;
    
    this.signupservice.signinstore(this.signin);
    this.submit_signin=false;
     this.signinForm.reset();

     }
     
  }
  }



