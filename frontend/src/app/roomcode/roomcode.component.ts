import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-roomcode',
  templateUrl: './roomcode.component.html',
  styleUrls: ['./roomcode.component.scss']
})
export class RoomcodeComponent implements OnInit {
  roomcode:number;
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
  }
  code() {
  this.authservice.createRoom().subscribe(data => 
    {
      this.roomcode=data['roomcode'];
      //console.log(this.roomcode);
    });
  }
}
