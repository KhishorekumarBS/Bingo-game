import { Component, OnInit } from '@angular/core';
declare  var jQuery:  any;
//import { visibility,  expand } from '../animations/app.animation';

@Component({
  selector: 'app-bingocard',
  templateUrl: './bingocard.component.html',
  styleUrls: ['./bingocard.component.scss'],
})
export class BingocardComponent implements OnInit {

  random_numbers: number[]=[];
  //i:number=5;
  constructor() { }

  ngOnInit(): void {
  


}
  rand() {
    while(this.random_numbers.length < 25){
     var rand =  Math.floor(Math.random() * 50)+1;
     this.random_numbers.splice(rand, 1) [0];
     if(this.random_numbers.indexOf(rand) === -1)this.random_numbers.push(rand);
    }
  console.log(this.random_numbers);
 }
 
  }
  

