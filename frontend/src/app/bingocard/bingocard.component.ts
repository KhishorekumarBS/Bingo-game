import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { RoomserviceService } from '../service/roomservice.service';
import { Router } from "@angular/router";
import { visibility,  expand } from '../animations/animation';

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

  constructor(private authservice: AuthService,private roomservice: RoomserviceService, private router:Router) { }

  ngOnInit(): void {
    this.myname=this.authservice.getName();
    this.all_players=this.roomservice.getallplayers();
    this.turn=0;
    this.rand();
    this.getcallnumber();
  }
  username:string=this.authservice.getName();

  selectedIdx = 0;
  selectItem(event) {
   var target = event.target || event.srcElement || event.currentTarget;
   var idAttr = target.attributes.id;
   var value = idAttr.nodeValue;
   this.elem = document.querySelector('#'+value) as HTMLElement;
   (this.elem).style.textDecoration='line-through';
   (this.elem).style.color='red';
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
      this.ones=this.timeLeft;
      this.timerid=setInterval(() => {
       this.timeLeft--;
     if(this.timeLeft>=0) {
      this.ones=this.timeLeft; 
     }
     else{
      clearTimeout(this.timerid);
     }
   },1000);
   resolve();
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
    });
      resolve();
 });
}

getcallnumber(){
  console.log("ingetcall");
  if(true){
    this.roomservice.putrandnum("-1","false").then(data=>
        {
         this.play(data).then(res=>
          {
            this.increment_turn();
            console.log("Turn incermented");//Run no
            //this.getcallnumber();
            console.log("insidegetcall");
        }) 
      });
  }
}

logout() {
  this.logged_out= this.authservice.logOut();
   this.router.navigate(['/login']);
 }
 
 }
   
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



