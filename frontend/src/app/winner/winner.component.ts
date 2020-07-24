import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RoomserviceService } from '../service/roomservice.service';
import { MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class WinnerComponent implements OnInit {
  all_players:string[];
  table_details:any[]=[];
  dataSource = new MatTableDataSource(this.table_details);
  displayedColumns = ['name', 'position'];
  constructor(private roomservice: RoomserviceService) { }

  ngOnInit(): void {
    this.all_players=this.roomservice.getallplayers();
    //this.rendertable();
    this.roomservice.putrandnum("false","-1","true").then(data=>
      {
        for(var i=0;i<this.table_details.length;i++)
             this.table_details[i]={name:this.all_players[i],position:data['score'][this.table_details[i].name]};
            /*{
              this.table_details[i].position=data['score'][this.table_details[i].name];
            }*/
      })
  }
  rendertable(){
  
    for(var i=0;i<this.all_players.length;i++){
    this.table_details[i]={name:this.all_players[i],position:0};
    }
  }
}
