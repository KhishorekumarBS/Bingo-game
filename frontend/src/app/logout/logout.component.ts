import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  send='';
  constructor(public dialogRef: MatDialogRef<LogoutComponent>) { }

  ngOnInit(): void {
  }
  /*logoutmsg() {
    //console.log('User: ', this.user);
    
    this.dialogRef.close();
  }*/
  type_number(){
    this.dialogRef.close();
    console.log(this.send);
  }
}
