import { Component, OnInit , Inject} from '@angular/core';
import { AuthService } from '../service/auth.service';
import { RoomserviceService } from '../service/roomservice.service';
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';
import { visibility,  expand } from '../animations/animation';



@Component({
  selector: 'app-roomcode',
  templateUrl: './roomcode.component.html',
  styleUrls: ['./roomcode.component.scss'],
  animations: [
    visibility(),
     expand()
  ]
})
export class RoomcodeComponent implements OnInit {
  roomcode:string;
  logged_out:boolean;
  icreatedroom = false;
  ijoinedroom=false;
  msg:string;
  all_players:string[];
  other_players: string[] = [];
  
  visibility = 'shown';
  index:number;
  i:number;
  j:number=0;
 
  constructor(private roomservice: RoomserviceService,private authservice:AuthService, private router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  username:string=this.authservice.getName();
  getroomcode() {
    this.roomservice.createRoom().then(data => 
    {
      this.roomcode=data;
      console.log(data);
      this.roomservice.joinRoom().then(data=>
        {
         this.all_players=data['players'];
         console.log("Player in component");
        var myname=this.authservice.getName();
       
        for(var i=0;i<this.all_players.length;i++){
            if(this.all_players[i]!=myname){
              console.log(this.all_players[i]);
              this.other_players.push(this.all_players[i]);
            }
        }
        this.icreatedroom=true;
        console.log(this.other_players);
        this.router.navigate(['/bingocard']);
        });
    });
    
  }
  
  logout() {
    this.logged_out= this.authservice.logOut();
     this.router.navigate(['/login']);
     this.msg="Logged out";
     this.dialog.open(LogoutComponent, {width: '200px', height: '150px'});
   }

   setroomcode(code:string) {
    this.roomservice.setcode(code);
    this.roomservice.joinRoom().then(data=>
      {
       this.all_players=data['players'];
       console.log("Player in component");
      var myname=this.authservice.getName();
     
      for(var i=0;i<this.all_players.length;i++){
          if(this.all_players[i]!=myname){
            console.log(this.all_players[i]);
            this.other_players.push(this.all_players[i]);
          }
      }
      this.ijoinedroom=true;
      console.log(this.other_players);
      this.router.navigate(['/bingocard']);
      });

  }
   
}
