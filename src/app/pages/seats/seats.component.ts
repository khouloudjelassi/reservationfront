import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ReservationService } from 'src/app/services/reservation.service';
import { SeatService } from 'src/app/services/seat.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent {

  date = this.route.snapshot.paramMap.get('date');
  selectedSeat: any = {};
  user : any = JSON.parse(localStorage.getItem('user') || '{}');
  display: boolean = false;
  seats: any[] = [];
  reservations: any[] = [];
 
  
  currentDate = this.date ? new Date(this.date) : new Date();

  constructor(
    private route: ActivatedRoute , 
    private seatService : SeatService , 
    private reservationService : ReservationService,
    private messageService: MessageService
  ){
    this.getSeats();
    this.getReservations();
  }

  getSeats = () => {
    this.seatService.getSeats().subscribe((data: any) => {
      this.seats = data;
    });
  } 

  getReservations = () => {
    this.reservationService.getReservationByDate(this.date).subscribe((data: any) => {
      this.reservations = data;

      // Mark reserved seats as reserved
      this.seats.forEach((seat: any) => {
        seat.reserved = false;
        this.reservations.forEach((reservation: any) => {
          if (seat.id === reservation.seat.id) {
            seat.reserved = true;
            seat.reservedBy = reservation.user.firstName + ' ' + reservation.user.lastName;
          }
        });
      });
    });
  }


  logout(){
    localStorage.clear();
    window.location.reload();
  }


  onSeatClick(seat:any){
    this.selectedSeat = seat;
    this.display = true;
  }

  reserveSeat() {
    const reservation = {
     seat : {
        id : this.selectedSeat.id
      },
      user : {
        id : this.user.id
      },
      date : this.date
     }

    this.reservationService.createReservation(reservation).subscribe((res: any) => {
      this.display = false;
      this.getSeats();
      this.getReservations();
      this.selectedSeat = {};
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Seat reserved successfully' });
    }, (error: any) => {
      this.display = false;
      this.selectedSeat = {};
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errors[0] });
    });
  }

}
