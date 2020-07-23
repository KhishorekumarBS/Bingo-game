import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { RoomserviceService } from '../service/roomservice.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  send='';
  timeLeft: number 
  timerid;
  ones;
  constructor(public dialogRef: MatDialogRef<PopupComponent>,private roomservice:RoomserviceService) { }

  ngOnInit(): void {
    //console.log(this.send);
    this.popup();
  }
  type_number(){
    this.dialogRef.close();
    //console.log(this.send);
    this.roomservice.get_entered_number(String(this.send));
  }
  popup(){
    this.timeLeft=10;  
   this.ones=this.timeLeft;
   this.timerid=setInterval(() => {
    this.timeLeft--;
   
  if(this.timeLeft>=0) {
   this.ones=this.timeLeft; 
   //console.log(this.ones);
  }
  else{
   clearTimeout(this.timerid);
   this.dialogRef.close();
   var send=String(Math.floor(Math.random() * 50)+1);
   this.roomservice.get_entered_number(send);
 }
},1000);
  }
}
