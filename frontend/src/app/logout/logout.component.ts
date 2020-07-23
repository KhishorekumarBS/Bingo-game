import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<LogoutComponent>) { }

  ngOnInit(): void {
  }
  logoutmsg() {
    this.dialogRef.close();
  }
  
}
