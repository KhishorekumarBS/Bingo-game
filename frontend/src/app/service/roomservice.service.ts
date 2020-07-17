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
  randnum:string;
  iterations:number=1;
  constructor(private authservice:AuthService,private http: HttpClient,private router: Router) { }

  createRoom() {
      // this.creator_name=this.authservice.getName();
      // console.log(this.creator_name);
      return new Promise<string>((resolve,reject)=> {
        this.http.post('/api/createroom', {}).subscribe(res=>{
          this.roomcode= res['roomcode'];
          console.log(this.roomcode);
          resolve(this.roomcode);    
      })
     });
    //  return this.roomcode;
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
  
  return new Promise<string[]>((resolve,reject)=> {
    
    this.http.post('/api/joinroom', {'roomcode':this.roomcode}).subscribe(res=>{
      console.log(res);  
      if(res['status']==true) {
      this. all_players=res['players'];
      
      resolve(this.all_players);
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
    console.log("In service");
    console.log(this.roomcode);
    console.log(rand_no);
    console.log(this.iterations);
  this.http.post('/api/getrandomcall',{'roomcode':this.roomcode,'turnsend':turn_send,'random_number':rand_no,'iterations':String(this.iterations) }).subscribe(res=>
    {
    this.randnum=res['random_number'];
    this.iterations++;
    resolve(this.randnum); 
    })   
  });
}

}
