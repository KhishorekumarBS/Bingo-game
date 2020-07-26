import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { RoomserviceService } from '../service/roomservice.service';
import { Router} from "@angular/router";
import { MatTableDataSource} from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';
import { PopupComponent } from '../popup/popup.component';
import { ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-bingocard',
  templateUrl: './bingocard.component.html',
  styleUrls: ['./bingocard.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class BingocardComponent implements OnInit {
  random_numbers: number[]=[];
  call_number:string;
  elem : HTMLElement;
  timeLeft: number 
  timerid;
  ones;
  all_players:string[];
  myname:string;
  logged_out:boolean;
  turn:number=0;
  myplayerindex:number;
  value:any;
  id_arr:any[]=[];
  id_present:boolean;
  table_details:any[]=[];
  myscore=0;
  gameover:boolean=false;
  dataSource = new MatTableDataSource(this.table_details);
  displayedColumns = ['name', 'position'];
  d1_elements:number[]=[5,9,13,17,21];
  d2_elements:number[]=[1,7,13,19,25];
   d1=5;d2=5;
   rows:number[]=[1,0,0,0,0];
   cols:number[]=[1,0,0,0,0];
   waiting;

  constructor(private authservice: AuthService,private roomservice: RoomserviceService, private router:Router,public dialog: MatDialog) {
   }

  ngOnInit(): void {
    this.myname=this.authservice.getName();
    this.all_players=this.roomservice.getallplayers();
    this.turn=0;
    this.myplayerindex=this.findmyplayerindex();
    this.rand();
    this.rendertable();
    this.getcallnumber();
    
  }
  username:string=this.authservice.getName();
  
  id_check(){
    return new Promise((resolve,reject)=> {
      for(var i=0;i<this.id_arr.length;i++){
          if(this.id_arr[i]==this.value){
            this.id_present=false;
            resolve(this.id_present);
          }
      }
      this.id_present=true; 
       resolve(this.id_present);
      })
  }

  selectItem(event) {

   var target = event.target || event.srcElement || event.currentTarget;
   var idAttr = target.attributes.id;
   this. value = idAttr.nodeValue;
   //console.log(this.value);
   if(this.id_arr!=[]){
     this.id_check().then(id=>
      {
        if(id){
          if(this.elem){
            (this.elem).style.color='white';
            (this.elem).style.textDecoration='none';
           }
            this.elem = document.querySelector('#'+this.value) as HTMLElement;
            (this.elem).style.textDecoration='line-through';
            (this.elem).style.color='orange';
        }
      })
   } 
 }

 rand() {
  while(this.random_numbers.length < 25){
   var rand =  Math.floor(Math.random() * 50)+1;
   this.random_numbers.splice(rand, 1) [0];
   if(this.random_numbers.indexOf(rand) === -1)this.random_numbers.push(rand);
  }
}

increment_turn(){
  this.turn++;
  //console.log(this.all_players);
  //console.log(this.turn);
  
  if(this.turn==this.all_players.length){
    this.turn=0;
    //console.log("Turn is 0");
  }
}

findmyplayerindex(){
  for(var i=0;i<this.all_players.length;i++)
  {
    if(this.myname==this.all_players[i]){
      return i;
    }
  }
  return -1;
}

game_ended(){
  console.log("Checkinf if game ended");
  for(let i=0;i<5;i++){
    console.log(this.rows[i]);
  }
  for(let i=0;i<5;i++){
    console.log("game ended(rows)");
    console.log(this.rows[i]);
    if(this.rows[i]!=0){
      return false;
    }
  }
  return true;
}
check_no_of_striked(){
  var id=Number(this.value.substring(1));
  if(((Number(this.call_number)%this.random_numbers[id])==0)){
    console.log("Valid");
    return true;
  }
  console.log("Invalid");
  return false;
}
updatescore(){
  var id=Number(this.value.substring(1));
  console.log((this.value.substring(1)+" is striked"));
   
  if(this.d1_elements.includes(id)){
    this.d1--;
    if(this.d1==0){
      console.log("Diaginal one done");
      this.myscore+=25;
    }
  }
  if(this.d2_elements.includes(id)){
    this.d2--;
    if(this.d2==0){
      console.log("Diaginal two done");
      this.myscore+=25;
    }
  }
  for(var i=0;i<5;i++){
    if((id-1)%5==i){
      this.cols[i]--;
      if(this.cols[i]==0){
        console.log("col done "+String(i));
        this.myscore+=20;
      }
    }
    if((id>(5*i))&&(id<=(5*(i+1)))){
      this.rows[i]=this.rows[i]-1;
      if(this.rows[i]==0){
        console.log("row done "+String(i));

        this.myscore+=20;
      }
    }
    console.log("row decremented");
    for(var i=0;i<5;i++){
      console.log(this.rows[i]);
    }

  }
  this.myscore+=5;
  if(this.game_ended){
    console.log("We are in the endgame now");
    this.gameover=true;
    this.router.navigate(['/winner']);
  }
}

runtime(){
  return new Promise((resolve,reject)=> {
       this.timeLeft=15; 
       this.ones=this.timeLeft; 
       //console.log(this.timeLeft)
      
      this.timerid=setInterval(() => {
       this.timeLeft--;
      
     if(this.timeLeft>=0) {
      this.ones=this.timeLeft;
      if(this.timeLeft<10){ 
        this.ones="0"+this.timeLeft;
        } 
      //console.log(this.ones);
     }
     else{
      clearTimeout(this.timerid);
      //console.log("Timer ends");
      resolve();
    }
   },1000);
  });
}

play(num){
  this.waiting=undefined;
  return new Promise((resolve,reject)=> {
      this.call_number=num;
   this.runtime().then(data=>
    {   
    
    if(this.elem){
      // if(this.check_no_of_striked()){
      this.updatescore();
      // }
      (this.elem).style.textDecoration='line-through';
      (this.elem).style.color='red';
      this.elem=undefined;
     this.id_arr.push(this.value);
  }
  
    resolve();
    });
 });
}


getcallnumber(){
  //console.log("ingetcall");
  //console.log(this.table_details);
  //console.log(this.turn);
  if(this.myplayerindex==this.turn){
    //console.log("if part");
    const dialogRef =this.dialog.open(PopupComponent, {width: '250px', height: '250px', disableClose: true,panelClass: 'custom-dialog-container'});
    dialogRef.afterClosed().subscribe(_ => {
      this.roomservice.putrandnum("true",this.myscore,"false").then(data=>
        {
          console.log(data);
         if(data['gameended']=="true"){
           dialogRef.close();
           this.router.navigate(['/winner']);
           return;
         } 
         this.play(data['random_number']).then(res=>
          {
            for(var i=0;i<this.table_details.length;i++)
            {
              //console.log(data['score'][this.table_details[i].name]);
              
              this.table_details[i].position=data['score'][this.table_details[i].name];
            }
            //console.log(this.timeLeft);
            this.increment_turn();
            //console.log("Turn incermented");
            this.getcallnumber();
            //console.log("insidegetcall");
            this.call_number=undefined;
        }) 
      });
    });      

  }
  else{
    this.waiting=this.all_players[this.turn];
    // console.log(this.table_details);
    // console.log(this.turn);
    this.roomservice.putrandnum("false",this.myscore,"false").then(data=>
        {
          
          if(data['gameended']=="true"){
            this.router.navigate(['/winner']);
            return;
          } 
          this.play(data['random_number']).then(res=>
          {

            for(var i=0;i<this.table_details.length;i++)
            {
              //console.log(data['score'][this.table_details[i].name]);
              
              this.table_details[i].position=data['score'][this.table_details[i].name];
            }
            // console.log(this.timeLeft);
            this.increment_turn();
            //console.log("Turn incermented");//Run no
            this.getcallnumber();
            //console.log("insidegetcall");
            this.call_number=undefined;
            
        }) 
      });
  }
  
}
rendertable(){
  
  for(var i=0;i<this.all_players.length;i++){
  this.table_details[i]={name:this.all_players[i],position:0};
  }
}
logout() {
  this.logged_out= this.authservice.logOut();
   this.router.navigate(['/login']);
  this.dialog.open(LogoutComponent, {width: '200px', height: '150px'});
 }
 
 }
 
   
 