import { Component, OnInit } from '@angular/core';
declare  var jQuery:  any;
import { interval, Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { RoomserviceService } from '../service/roomservice.service';
import { Router } from "@angular/router";
import { ɵallowPreviousPlayerStylesMerge } from '@angular/animations/browser';
import { visibility,  expand } from '../animations/animation';
import { send } from 'process';

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
  //i:number=5;
  rando:number;
  statusClass : string;
  elem : HTMLElement;
  subscription: Subscription;
  timeLeft: number 
  timerid;
  tens;
  ones;
  all_players:string[];
  index:number;
  turn_send:boolean=false;
  receive:string="waiting for the number...";
  send:string;
  send_no:string="waiting";
  myname:string;
  logged_out:boolean;
  rand_no:number;
  iamreceiving=false;
  iamsending=false;
  timerstarts=false;
  turn:number=0;
  constructor(private authservice: AuthService,private roomservice: RoomserviceService, private router:Router) { }

  ngOnInit(): void {
    
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
     if(this.timeLeft<=10) {
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
     if(this.timeLeft<=10) {
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
              if(this.receive==" "){
                
                if(this.turn==this.all_players.length){
                  this.turn=0;
               } 
                this.number_enter_turn();
                this.turn++;
              }
             
             
            }
          });
         console.log("receive");
        console.log(this.receive);
      }
      
     
  }
  rand() {
    while(this.random_numbers.length < 25){
     var rand =  Math.floor(Math.random() * 50)+1;
     this.random_numbers.splice(rand, 1) [0];
     if(this.random_numbers.indexOf(rand) === -1)this.random_numbers.push(rand);
    }
    console.log(this.random_numbers);
    this.number_enter_turn();
     //turn=0;
    
   // for(this.turn=0;;this.turn++){
     
    //}
     
 }

 
 
 

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

logout() {
 this.logged_out= this.authservice.logOut();
  this.router.navigate(['/login']);
}

}
  

