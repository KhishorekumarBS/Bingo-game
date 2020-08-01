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
  ],
  
})
export class RoomcodeComponent implements OnInit {
  roomcode:string;
  logged_out:boolean;
  icreatedroom = false;
  ijoinedroom=false;
  wait_to_join;
  all_players:string[];
  other_players: string[] = [];
  no_of_players=[2,3,4,5];
  no_selected;
 
  constructor(private roomservice: RoomserviceService,private authservice:AuthService, private router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  username:string=this.authservice.getName();
  getInnerText(innerText){
    console.log(innerText)
    this. no_selected=innerText;
  }
  getroomcode() {
    this.wait();
    this.roomservice.createRoom(this.no_selected).then(data => 
    {
      this.roomcode=data;
      console.log(data);
      this.roomservice.joinRoom().then(data=>
        {
         if(this.other_players!=[]){
           this.wait_to_join=false;
         } 
         this.all_players=data['players'];
         //console.log("Player in component");
        var myname=this.authservice.getName();
       
        for(var i=0;i<this.all_players.length;i++){
            if(this.all_players[i]!=myname){
              //console.log(this.all_players[i]);
              this.other_players.push(this.all_players[i]);
            }
        }
        this.icreatedroom=true;
        //console.log(this.other_players);
        this.router.navigate(['/bingocard']);
        });
    });
    
  }
  wait(){
    this.wait_to_join=true;
  }
  logout() {
    this.logged_out= this.authservice.logOut();
     this.router.navigate(['/login']);
     this.dialog.open(LogoutComponent, {width: '200px', height: '150px'});
   }

   setroomcode(code:string) {
    this.roomservice.setcode(code);
    this.roomservice.joinRoom().then(data=>
      {
       this.all_players=data['players'];
       //console.log("Player in component");
      var myname=this.authservice.getName();
     
      for(var i=0;i<this.all_players.length;i++){
          if(this.all_players[i]!=myname){
            //console.log(this.all_players[i]);
            this.other_players.push(this.all_players[i]);
          }
      }
      this.ijoinedroom=true;
      //console.log(this.other_players);
      this.router.navigate(['/bingocard']);
      });

  }
   
}
