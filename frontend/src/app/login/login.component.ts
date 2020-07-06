import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../service/validation.service';
import { SignupService } from '../service/signup.service';
//import { RouterModule, Routes} from '@angular/router';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { Signup, Signin } from '../../shared/signup';
import { RoomcodeComponent } from "../roomcode/roomcode.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 @ViewChild('fform') signupFormDirective;
 @ViewChild('sform') signinFormDirective;
 //@ViewChild(RoomcodeComponent) childmessage;
  signupForm: FormGroup;
  signup: Signup ; 
  submit_signup= false;
  signinForm: FormGroup;
  signin: Signin;
  submit_signin=false;
  data: boolean;
  infoMessage = '';
 // message='';
   constructor(private fb: FormBuilder,private sb: FormBuilder, private signupservice: SignupService,private route:ActivatedRoute ) {
    this.createsignupForm();
    this.createsigninForm();
  }

  ngOnInit() {
    //this.message=this.childmessage.msg;
  //this.signupservice.signupstore().subscribe(data => this.data = canshow);
  /*this.route.queryParams
      .subscribe(params => {
        if(params.success !== undefined && params.success === 'true') {
            this.infoMessage = 'Registration Successful! Please Login!';
        }
      });*/
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
    this.signupservice.signupstore(this.signup).subscribe(data => 
      {
        if(data['success']) 
          this.infoMessage = "Registration successfull. Please login to continue";
        else
          this.infoMessage = "Email-id already exists";
      });
    this.submit_signup=false;
     this.signupForm.reset();
     console.log(this.infoMessage);
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



