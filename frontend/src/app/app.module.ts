import { BrowserModule } from '@angular/platform-browser';


import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

import {HTTP_INTERCEPTORS} from '@angular/common/http';


import {  MatTableModule , MatTableDataSource} from "@angular/material/table";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms'; 
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule} from '@angular/common/http';
import { AuthInterceptor } from './service/auth.interceptor';


import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { LoginComponent } from './login/login.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ValidationService } from './service/validation.service';
import { BingocardComponent } from './bingocard/bingocard.component';
import { RoomcodeComponent } from './roomcode/roomcode.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { PopupComponent } from './popup/popup.component';
import { WinnerComponent } from './winner/winner.component';
import { InstructionsComponent } from './instructions/instructions.component';


@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    LoginComponent,
    ErrorMessageComponent,
    BingocardComponent,
    RoomcodeComponent,
    LogoutComponent,
    ProfileComponent,
    PopupComponent,
    WinnerComponent,
    InstructionsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    HttpClientModule,
  ],
  providers: [     
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ValidationService ],
  
  
  
  bootstrap: [AppComponent]
})
export class AppModule { }
