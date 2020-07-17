import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 // name :string;
  constructor(private authservice: AuthService) { }
  
  ngOnInit(): void {
  }
 name :string= this.authservice.getName() ;
  
 
  mailid='a@c.com';
  isReadonly = true;
  

  toggleReadonly() {
    this.isReadonly = !this.isReadonly;

  
  //console.log(this.name);
  }
  //this.name= this.authservice.getName();
}
