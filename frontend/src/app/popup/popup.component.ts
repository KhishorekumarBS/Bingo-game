import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  type_number() {
    const dialogRef =this.dialog.open(LogoutComponent, {width: '200px', height: '150px'});
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
         dialogRef.close();
      }, 10000)
    })
  }
}
