import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import {AuthService } from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class RoomserviceService {
  private roomcode: string=undefined;
  
  myindex:number;
  all_players:string[];
  iterations:number=1;
  entered_number:string=undefined;
  myscore="0";
  

  constructor(private authservice:AuthService,private http: HttpClient,private router: Router) { 
  }

  createRoom(no_selected) {
      return new Promise<string>((resolve,reject)=> {
        // console.log("No of players");
        // console.log(no_selected);
        this.http.post('/api/createroom', {'no_players':no_selected}).subscribe(res=>{
          this.roomcode= res['roomcode'];
          //console.log(this.roomcode);
          resolve(this.roomcode);    
      })
     });
    }
  getcode(): string {
    return this.roomcode;
  }
  getmyindex(): number {
    return this.myindex;
  } 
  getallplayers(): string[] {
    return this.all_players;
  }
  
joinRoom() {
  
  return new Promise((resolve,reject)=> {
    
    this.http.post('/api/joinroom', {'roomcode':this.roomcode}).subscribe(res=>{
      this.all_players=res['players'];
      //console.log(res);  
      if(res['status']==true) {
      resolve(res);
    }
  })
 });
}
setscore(score){
  this.myscore=String(score);
  //console.log("setscore "+this.myscore);
}
setcode(joincode) {
  this.roomcode=joincode;
  //console.log(this.roomcode);
}
get_entered_number(typed_no){
  
  this.entered_number=typed_no;
  //console.log(this.entered_number);
}

putrandnum(turn_send){
  // console.log("putrandnum");
  // console.log(this.roomcode);
  // console.log(this.entered_number);
  return new Promise((resolve,reject)=> {
  this.http.post('/api/getrandomcall', {'roomcode':this.roomcode, 'turnsend':turn_send, 
  'random_number':this.entered_number, 'iterations':this.iterations,'score':this.myscore}).subscribe(res=>
    {
      this.iterations++;
      // console.log("response");
      // console.log(res);
      resolve(res); 
  
    });
  });
}

getwinnerdetails(){
  return new Promise((resolve,reject)=> {
    // console.log("winnerservice");
    // console.log(this.myscore);

    this.http.post('/api/getwinner', {'roomcode':this.roomcode,'score':this.myscore}).subscribe(res=>
      {
        // console.log("winner details in service");
        // console.log(res);
        resolve(res);
      });
    });
}
exit(name){
  this.http.post('/api/exitgame', {'roomcode': this.roomcode,'username':name}).subscribe(res=>
    {
      if(res['status']==true){
        this.router.navigate(['/roomcode']);
      }
    })
}

reset_values()
{
  this.iterations=1;
  this.myscore="0";
  this.entered_number=undefined;
}
}
