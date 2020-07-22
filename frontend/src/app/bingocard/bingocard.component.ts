import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { RoomserviceService } from '../service/roomservice.service';
import { Router, ResolveEnd } from "@angular/router";
import { visibility,  expand } from '../animations/animation';
import { MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-bingocard',
  templateUrl: './bingocard.component.html',
  styleUrls: ['./bingocard.component.scss'],
  animations: [
    visibility(),
     expand()
  ]
})
export class BingocardComponent implements OnInit {
  visibility = 'shown';
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
  rand_no:number;
  value:any;
  id_arr:any[]=[];
  id_present:boolean;
  table_details:any[]=[];
  score:any[]=[];
  dataSource = new MatTableDataSource(this.table_details);
  displayedColumns = ['name', 'position'];
  userlist: any;

  constructor(private authservice: AuthService,private roomservice: RoomserviceService, private router:Router,public dialog: MatDialog) {
   }

  ngOnInit(): void {
    this.myname=this.authservice.getName();
    this.all_players=this.roomservice.getallplayers();
    this.turn=0;
    this.rand();
    this.getcallnumber();
    this.rendertable();
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
  console.log(this.all_players);
  console.log(this.turn);
  
  if(this.turn==this.all_players.length){
    this.turn=0;
    console.log("Turn is 0");
  }
}

myturn(){
  if(this.myname==this.all_players[this.turn]){
    return true;
  }
  return false;
}

check_no_of_striked(){

}

calculatescore(){

}

updatescore(){

}

runtime(){
  return new Promise((resolve,reject)=> {
       this.timeLeft=10;  
       //console.log(this.timeLeft)
      this.ones=this.timeLeft;
      this.timerid=setInterval(() => {
       this.timeLeft--;
      
     if(this.timeLeft>=0) {
      this.ones=this.timeLeft; 
      console.log(this.ones);
     }
     else{
      clearTimeout(this.timerid);
      console.log("Timer ends");
      resolve();
    }
   },1000);
  });
}

play(num){
  return new Promise((resolve,reject)=> {
      this.call_number=num;
   this.runtime().then(data=>
    {   
    this.check_no_of_striked();
    this.calculatescore();
    this.updatescore();
    if(this.elem){
      (this.elem).style.textDecoration='line-through';
      (this.elem).style.color='red';
      this.elem=undefined;
      this.id_arr.push(this.value);
      for(var i=0;i<this.all_players.length;i++){
        if(this.myname==this.table_details[i].name){
          this.table_details[i].position+=5;
          console.log(this.table_details[i].position);
        }
    }
   /*let item={name:this.myname ,position:this.score[this.turn]}
   let index = this.table_details.indexOf(item);
    item.position = this.score[this.turn]+5;
    this.table_details[index] = item;*/
   //this.score[this.turn]+=5;
   
   }
   /*this.userlist=this.table_details.find(obj=>obj.name=== this.myname);
   console.log("find ans "+this.userlist);
   if((this.table_details.find(obj=>obj.name=== this.myname))){ 

   this.table_details.map(obj =>obj.position = obj.position+5);
   }
   /*this.table_details.filter(function(position){
     if(position.name==this.myname){
    return position.position+5;
     }
  })*/
  // console.log("score"+this.score[this.turn]);
  
    resolve();
    });
 });
}

getcallnumber(){
  console.log("ingetcall");
  if(true){
    this.roomservice.putrandnum("-1","false").then(data=>
        {
         this.play(data).then(res=>
          {
            console.log(this.timeLeft);
            this.increment_turn();
            console.log("Turn incermented");//Run no
            this.getcallnumber();
            console.log("insidegetcall");
        }) 
      });
  }
}
rendertable(){
  
  for(var i=0;i<this.all_players.length;i++){
  this.score.push(0);  
  this.table_details[i]={name:this.all_players[i],position:0};
  }
}
logout() {
  this.logged_out= this.authservice.logOut();
   this.router.navigate(['/login']);
   //this.msg="Logged out";
  this.dialog.open(LogoutComponent, {width: '200px', height: '150px'});
 }
 
 }
 /*export interface Element {
  name: string;
  position: number;
  all_players:string[]=[];
}
//const PLAYERS:[]=this.all_players;
for(var i=0;i<this.all_players.length;i++){
  all_players.push({name:this.all_players[i],position:i+1})
}
const ELEMENT_DATA: Element[] = 
/*[
 
  /*{position: i, name: this.all_players[i], },
  {position: 2, name: 'Helium',},
  {position: 3, name: 'Lithium', },
  
];*/
   
 /*before_start_timer(){

  this.timeLeft=0;
    this.tens_before=0;
    this.ones_before=this.timeLeft;
    this.timerid=setInterval(() => {
      if(this.start==true){
        clearTimeout(this.timerid);
        console.log("start clicked");
        console.log(this.start);
      }
       this.timeLeft++;
     if(this.timeLeft<10) {
      this.tens_before=0;
    this.ones_before=this.timeLeft;
       
     }
     else{
      this.tens_before=0;
      this.ones_before=0;
      clearTimeout(this.timerid);
     }
   },1000);
 }
 
  values = '';
  sendrand() {
    console.log(this.send);
    this.send_no=this.send;
    this.roomservice.putrandnum(this.send,String(this.turn_send));
  }
  random_send() {
    this.timeLeft=0;
    this.tens=0;
    this.ones=this.timeLeft;
    this.timerid=setInterval(() => {
      
       this.timeLeft++;
     if(this.timeLeft<10) {
       this.tens=0;
       this.ones=this.timeLeft;
       if(this.send_no!="waiting"){
        clearTimeout(this.timerid);
        this.iamsending=false;
       }
     }
     else{
       this.tens=0;
       this.ones=0;
       var rand =  Math.floor(Math.random() * 50)+1;
       clearTimeout(this.timerid);
       this.iamsending=false;
       this.roomservice.putrandnum(rand,String(this.turn_send));
     }
   },1000);
   }
   random_receive(){
    this.timeLeft=0;
    this.tens=0;
    this.ones=this.timeLeft;
    this.timerid=setInterval(() => {
       this.timeLeft++;
     if(this.timeLeft<10) {
       this.tens=0;
       this.ones=this.timeLeft;
       
     }
     else{
       this.tens=0;
       this.ones=0;
       this.receive= " ";
       clearTimeout(this.timerid);
     }
   },1000);
   }
  number_enter_turn() {
    this.myname=this.authservice.getName();
    this.all_players=this.roomservice.getallplayers();
      if(this.all_players[this.turn]==this.myname){
        this.turn_send=true; 
        this.iamsending=true;
        this.random_send();
      }
      else{
        this.iamreceiving=true;
        console.log("else");
        this.turn_send=false;
        this.roomservice.putrandnum("-1",String(this.turn_send)).then(data=>
          {
            this.receive=data;
            if(this.receive!="waiting for the number..."){
              this.random_receive();
              
            }
          });
         console.log("receive");
        console.log(this.receive);
      }
      
     
  }
 */

 
 
 

/*setIntrvl(){
  this.timeLeft=1;
  
  this.tens=0;
  this.ones=this.timeLeft;
  this.rando=Math.floor(Math.random() * 50)+1;
  this.random();
  //console.log("Repeat starts");
  setInterval(() => {
    clearTimeout(this.timerid);
    this.timeLeft=1;
    this.tens=0;
    this.ones=this.timeLeft;
    this.rando=Math.floor(Math.random() * 50)+1;
    this.random();
  } ,10000);
}*/



