import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './components/settings/settings.component';
import { AddUpdateRoomComponent } from "./components/add-update-room/add-update-room.component";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ListRoomComponent } from "./components/list-room/list-room.component";
import { SeatsComponent } from './components/seats/seats.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SeatsComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    FormsModule,
    DialogModule,
    AddUpdateRoomComponent,
    FormsModule, // Add FormsModule here
    SweetAlert2Module.forRoot(),
    ListRoomComponent
],
  providers: [
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
