import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ReservationService } from 'src/app/services/reservation.service';
import { SeatService } from 'src/app/services/seat.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  date : any;
  user : any = JSON.parse(localStorage.getItem('user') || '{}');
 
  

  constructor(
    private route: ActivatedRoute , 
  ){
  }

  viewCalendar(date: any){
    window.location.href = '/seats/' + this.date;
  }



  logout(){
    localStorage.clear();
    window.location.reload();
  }


}
