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
  random_numbers: number[];
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
  table_details:any[];
  gameover:boolean;
  dataSource = new MatTableDataSource(this.table_details);
  displayedColumns ;
  d1_elements:number[];
  d2_elements:number[];
   d1;d2;
   rows:number[];
   cols:number[];
   waiting;exit;
   myscore;
  close=false;

  constructor(private authservice: AuthService,private roomservice: RoomserviceService, private router:Router,public dialog: MatDialog) {
   }

  ngOnInit(): void {
    this.random_numbers=[];
    this.call_number=undefined;
    this.timeLeft=0;
    this.table_details=[];

  this.gameover=false;
  this.dataSource = new MatTableDataSource(this.table_details);
  this.displayedColumns = ['name', 'position'];
  this.d1_elements=[5,9,13,17,21];
  this.d2_elements=[1,7,13,19,25];
  this.d1=5;this.d2=5;
   this.rows=[5,5,5,5,5];
   this.cols=[5,5,5,5,5];
  
    this.myscore=0;
    this.myname=this.authservice.getName();
    //console.log(this.myname);
    this.all_players=this.roomservice.getallplayers();
    //console.log(this.all_players);
    this.turn=0;
    this.gameover=false;
    this.myplayerindex=this.findmyplayerindex();
    this.rand();
    this.rendertable();
    this.getcallnumber();
    
  }
  
  
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
            var id_=Number(this.value.substring(1));
            if(((Number(this.call_number)%this.random_numbers[id_-1])==0)){
            this.elem = document.querySelector('#'+this.value) as HTMLElement;
            (this.elem).style.textDecoration='line-through';
            (this.elem).style.color='orange';
            }
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
  // console.log("random numbers");
  // console.log(this.random_numbers);
}

increment_turn(){
  this.turn++;
  //console.log(this.all_players);
  //console.log(this.turn);
  
  if(this.turn==this.all_players.length){
    this.turn=0;
   // console.log("Turn is 0");
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
  //console.log("Checkinf if game ended");
  for(let i=0;i<5;i++){
    //console.log(this.rows[i]);
  }
  for(let i=0;i<5;i++){
    // console.log("game ended(rows)");
    // console.log(this.rows[i]);
    if(this.rows[i]!=0){
      return false;
    }
  }
  return true;
}

updatescore(){
  var id=Number(this.value.substring(1));
  //console.log((this.value.substring(1)+" is striked"));
   
  if(this.d1_elements.includes(id)){
    this.d1--;
    //console.log("d1 is "+this.d1);
    if(this.d1==0){
     // console.log("Diaginal one done");
      this.myscore+=25;
    }
  }
  if(this.d2_elements.includes(id)){
    this.d2--;
    //console.log("d2 is "+this.d2);
    if(this.d2==0){
     // console.log("Diaginal two done");
      this.myscore+=25;
    }
  }
  for(var i=0;i<5;i++){
    //console.log(i);
  //  console.log("first i loop"+i); 
  //  //console.log("cols loop "+(id-1)%5);
    if((id-1)%5==i){
      this.cols[i]--;
     // console.log("cols are "+this.cols);
      if(this.cols[i]==0){
        //console.log("col done "+String(i));
        this.myscore+=20;
      }
    }
    //console.log("row cdn "+id+" "+(5*i)+" "+5*(i+1));
    if((id>(5*i))&&(id<=(5*(i+1)))){
      this.rows[i]=this.rows[i]-1;
     //console.log("rows are "+this.rows);
      if(this.rows[i]==0){
        //console.log("row done "+String(i));
        this.myscore+=20;
      }
      }
    }
  this.myscore+=5;
  if(this.close){
    this.myscore=-1;
  }
  this.roomservice.setscore(this.myscore);
  if(this.game_ended()){
    //console.log("We are in the endgame now");
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
    //console.log("after timer");
    if(this.elem){
       //if(this.check_no_of_striked()){
      this.updatescore();
       //}
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
  // console.log("ingetcall");
  // console.log(this.table_details);
  // console.log("Turn value");
  // console.log(this.turn);
  // console.log("myplayerindex");
  // console.log(this.myplayerindex);
  if(this.myplayerindex==this.turn){
    //console.log("if part");
    
    const dialogRef =this.dialog.open(PopupComponent, {width: '250px', height: '250px', disableClose: true,panelClass: 'custom-dialog-container'});
    //console.log("popup open");
    if(this.close){
      dialogRef.close();
    }
    dialogRef.afterClosed().subscribe(_ => {
     // console.log("popup close");
      this.roomservice.putrandnum("true").then(data=>
        {
          // console.log("data");
          //  console.log(data);
         if(data['gameended']=="true"){
           dialogRef.close();
           this.router.navigate(['/winner']);
           return;
         } 
         this.play(data['random_number']).then(res=>
          {
           // console.log("score details");
            for(var i=0;i<this.table_details.length;i++)
            {
            //  console.log(data['score'][this.table_details[i].name]);
              
            if(data['score'][this.table_details[i].name]=="-1"){
              this.table_details[i].position="disqualified";
            }
            else{
            this.table_details[i].position=data['score'][this.table_details[i].name];
            }
            }
            //console.log(this.timeLeft);
            this.increment_turn();
          //  console.log("Turn incermented");

            if(!this.gameover){
            this.getcallnumber();
            }

            //console.log("insidegetcall");
            this.call_number=undefined;
        }) 
      });
    });      

  }
  else{
    //console.log("else part");
    this.waiting=this.all_players[this.turn];
    //  console.log(this.table_details);
    //  console.log(this.turn);
    this.roomservice.putrandnum("false").then(data=>
        {
          // console.log("data");
          // console.log(data);
          if(data['gameended']=="true"){
            this.router.navigate(['/winner']);
            return;
          } 
          this.play(data['random_number']).then(res=>
          {
           //console.log("score details");
            for(var i=0;i<this.table_details.length;i++)
            {
             // console.log(data['score'][this.table_details[i].name]);
              
             if(data['score'][this.table_details[i].name]=="-1"){
              this.table_details[i].position="disqualified";
            }
            else{
            this.table_details[i].position=data['score'][this.table_details[i].name];
            }
            }
            // console.log(this.timeLeft);
            this.increment_turn();
           // console.log("Turn incermented");//Run no
            if(!this.gameover){
              this.getcallnumber();
              }
            //console.log("insidegetcall");
            this.call_number=undefined;
            
        }) 
      });
  }
  
}
rendertable(){
  //console.log("table details");
  for(var i=0;i<this.all_players.length;i++){
  this.table_details[i]={name:this.all_players[i],position:0};
 // console.log(this.table_details[i]);
  }
}
logout() {
  this.logged_out= this.authservice.logOut();
   this.router.navigate(['/login']);
  this.dialog.open(LogoutComponent, {width: '200px', height: '150px'});
 }

 exitgame(){
   this.close=true;
   this.roomservice.setscore(-1);
   this.roomservice.exit(this.myname)
 }
 
 }
 
   
 