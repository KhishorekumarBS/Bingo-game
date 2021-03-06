import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../service/validation.service';
import { SignupService } from '../service/signup.service';
import { AuthService } from '../service/auth.service';
import { RoomserviceService } from '../service/roomservice.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Signup, Signin } from '../../shared/signup';
import { ViewEncapsulation } from '@angular/core' 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
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
  data: boolean;
  infoMessage = '';
 
   constructor(private fb: FormBuilder,private sb: FormBuilder,private router:Router, private authservice: AuthService,private roomservice: RoomserviceService, private signupservice: SignupService,private route:ActivatedRoute ) {
    this.createsignupForm();
    this.createsigninForm();
  }

  ngOnInit() {
    this.user_state();
  }

  user_state(){
    var state=this.authservice.getuserstate();
    console.log(state);
    //var room_state=this.roomservice.getuserstate(); 
    if(state){
      this.router.navigate(['/roomcode']);
    }
  }
  createsignupForm() {
    this.signupForm = this.fb.group({
      EMAILADDRESS:  ['', [Validators.required, Validators.email]],
      USERNAME:  ['', Validators.required ],
      PASSWORD:  ['', [Validators.required]],
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
        {
          this.signupservice.signinstore(this.signup.EMAILADDRESS,this.signup.PASSWORD).subscribe(data=>
            {
              this.authservice.storeUserCredentials(data);
        if(data['success']==true){
          //console.log(res['success']);
        this.router.navigate(['/roomcode'])
        }
      });
          //this.infoMessage = "Registration successful. Please SignIn to continue";
          //this.router.navigate(['/roomcode']);
        }
        else
          this.infoMessage = "Email-id already exists";
      });
    this.submit_signup=false;
     this.signupForm.reset();
     //console.log(this.infoMessage);
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
    
    this.signupservice.signinstore(this.signin.EMAILADDRESS,this.signin.PASSWORD).subscribe(data=>
      {
        if(data['status']=="IncorrectUsernameError"){
          this.infoMessage="Incorrect Email address!"
        }
        if(data['status']=="IncorrectPasswordError"){
          this.infoMessage="Incorrect Password!"
        }
        this.authservice.storeUserCredentials(data);
        if(data['success']==true){
          //console.log(res['success']);
        this.router.navigate(['/roomcode'])
        }
      });
    this.submit_signin=false;
     this.signinForm.reset();

     }
     
  }
 
  }



