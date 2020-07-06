import { Component, OnInit } from '@angular/core';
declare  var jQuery:  any;
import { interval, Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from "@angular/router";
//import { visibility,  expand } from '../animations/app.animation';

@Component({
  selector: 'app-bingocard',
  templateUrl: './bingocard.component.html',
  styleUrls: ['./bingocard.component.scss'],
})
export class BingocardComponent implements OnInit {

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
  logged_out:boolean;
  constructor(private authservice: AuthService, private router:Router) { }

  ngOnInit(): void {
    
  }
  username:string=this.authservice.getName();
  rand() {
    while(this.random_numbers.length < 25){
     var rand =  Math.floor(Math.random() * 50)+1;
     this.random_numbers.splice(rand, 1) [0];
     if(this.random_numbers.indexOf(rand) === -1)this.random_numbers.push(rand);
    }
  console.log(this.random_numbers);
 }
 
 random() {
 this.timerid=setInterval(() => {
    //console.log("Incrementing");
    this.timeLeft++;
  if(this.timeLeft<10) {
    this.tens=0;
    this.ones=this.timeLeft;
  }
  else{
    this.tens=1;
    this.ones=0;
  }
    //console.log(this.timeLeft);
},1000);
    //console.log(this.random_numbers);
}
 
 selectedIdx = 0;
 selectItem(event) {
  var target = event.target || event.srcElement || event.currentTarget;
  //console.log(target);
 // console.log(target)
  var idAttr = target.attributes.id;
  //console.log(idAttr);
  var value = idAttr.nodeValue;
  //console.log(value);
  this.elem = document.querySelector('#'+value) as HTMLElement;
  (this.elem).style.textDecoration='line-through';
  (this.elem).style.color='red';
}

setIntrvl(){
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
}
logout() {
 this.logged_out= this.authservice.logOut();
  this.router.navigate(['/login']);
}

}
  

