import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RoomserviceService } from '../service/roomservice.service';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource} from '@angular/material/table';
import { Router} from "@angular/router";


@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss'],
 
})
export class WinnerComponent implements OnInit {
  all_players:string[];
  table_details:any[]=[];
  dataSource = new MatTableDataSource(this.table_details);
  displayedColumns = ['name', 'position'];
  winner;myname;x;
  constructor(private authservice: AuthService,private roomservice: RoomserviceService,private router:Router) { }

  ngOnInit(): void {
    this.myFunction();
    this.myname=this.authservice.getName();
    this.all_players=this.roomservice.getallplayers();
    this.rendertable();
    this.roomservice.getwinnerdetails().then(data=>
      {
       // console.log("winner details in component");
        //console.log(data);
        for(var i=0;i<this.table_details.length;i++)
             //this.table_details[i]={name:this.all_players[i],position:data['score'][this.table_details[i].name]};
            {
              this.table_details[i].position=data['score'][this.table_details[i].name];
            }
            if(data['winner']!=this.myname){
              this.winner= data['winner'];
            }
            this.roomservice.reset_values();
      })
      
  }
   myFunction() {
    this. x = document.getElementsByTagName("BODY")[0] as HTMLElement;
    this.x.style.backgroundColor = "black";
  }
  go_room(){
    this.router.navigate(['/roomcode']);
   // this. x = document.getElementsByTagName("BODY")[0] as HTMLElement;
    this.x.style.backgroundColor = "#c8c8c8";
  }
  rendertable(){
  
    for(var i=0;i<this.all_players.length;i++){
    this.table_details[i]={name:this.all_players[i],position:0};
    }
  }
}
