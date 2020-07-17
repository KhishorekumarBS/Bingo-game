import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from "@angular/router";
import {AuthService } from "./auth.service";
import { rejects } from 'assert';


@Injectable({
  providedIn: 'root'
})
export class RoomserviceService {
  private roomcode: string=undefined;
  
  myindex:number;
  all_players:string[];
  i:number;
  randnum:number;
  iterations:number=1;
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

putrandnum(rand_no,turn_send){
  return new Promise<string>((resolve,reject)=> {
    this.randnum=Math.floor(Math.random() * 50)+1;
    resolve(String(this.randnum)); 
  
  });
}

}
