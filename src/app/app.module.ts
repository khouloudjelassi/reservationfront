import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SeatsComponent } from './pages/seats/seats.component';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './components/settings/settings.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AddUpdateRoomComponent } from "./components/add-update-room/add-update-room.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SeatsComponent,
    SettingsComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    FormsModule,
    DialogModule,
    AddUpdateRoomComponent

    
],
  providers: [
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
