import { Component, OnInit , Inject} from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';

//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-roomcode',
  templateUrl: './roomcode.component.html',
  styleUrls: ['./roomcode.component.scss']
})
export class RoomcodeComponent implements OnInit {
  roomcode:number;
  logged_out:boolean;
  msg:string;
  
  constructor(private authservice: AuthService, private router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  //
  username:string=this.authservice.getName();
  code() {
  this.authservice.createRoom().subscribe(data => 
    {
      this.roomcode=data['roomcode'];
      
      //console.log(this.roomcode);
    });
  }
  logout() {
    this.logged_out= this.authservice.logOut();
     this.router.navigate(['/login']);
     this.msg="Logged out";
     this.dialog.open(LogoutComponent, {width: '200px', height: '150px'});
     // alert("Successfully logged out");
  
   }
   
}
