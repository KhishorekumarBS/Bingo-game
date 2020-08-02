import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BingocardComponent } from './bingocard/bingocard.component';
import { LoginComponent } from './login/login.component';
import {RoomcodeComponent } from './roomcode/roomcode.component';
import {WinnerComponent } from './winner/winner.component';
import { InstructionsComponent } from './instructions/instructions.component';



const routes: Routes = [  
    { path: 'bingocard', component: BingocardComponent },
    { path: 'instructions', component: InstructionsComponent },
    { path: 'roomcode', component:  RoomcodeComponent },
    { path: '', component: InstructionsComponent },
     { path: 'login', component: LoginComponent },
     { path: 'winner', component: WinnerComponent },
    //{ path: '', redirectTo: '/login', pathMatch:'full'  },
];  

@NgModule({
  imports: [RouterModule.forRoot(routes),
  CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
