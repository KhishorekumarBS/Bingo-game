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
  entered_number:string;

  constructor(private authservice:AuthService,private http: HttpClient,private router: Router) { }

  createRoom() {
      return new Promise<string>((resolve,reject)=> {
        this.http.post('/api/createroom', {}).subscribe(res=>{
          this.roomcode= res['roomcode'];
          console.log(this.roomcode);
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
      console.log(res);  
      if(res['status']==true) {
      resolve(res);
    }
  })
 });
}

setcode(joincode) {
  this.roomcode=joincode;
  console.log(this.roomcode);
}
get_entered_number(typed_no){
  
  this.entered_number=typed_no;
  console.log(this.entered_number);
}

putrandnum(turn_send,score,gameover){
  return new Promise((resolve,reject)=> {
  this.http.post('/api/getrandomcall', {'roomcode':this.roomcode, 'turnsend':turn_send, 
  'random_number':this.entered_number, 'iterations':this.iterations,'score':String(score),'gameover':String(gameover)}).subscribe(res=>
    {
      this.iterations++;
      console.log(res);
      resolve(res); 
  
    });
  });
}

}
