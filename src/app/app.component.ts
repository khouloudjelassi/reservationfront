import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  user: any = JSON.parse(localStorage.getItem('user') || '{}');

  logout(){
    localStorage.clear();
    window.location.reload();
  }

}
