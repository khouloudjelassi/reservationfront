import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ReservationService } from 'src/app/services/reservation.service';
import { SeatService } from 'src/app/services/seat.service';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/room';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

 // HostListener for window load event
 @HostListener('window:load', ['$event'])
 onWindowLoad(event: Event): void {
  this.router.navigate(['/settings']);  }

/***array */
  departments: string[] = ['Software', 'Reseau'];
  rooms: Room[] = [];
  selectedRoom: any = {};
  selectedSeat: any = {};
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  seats: any[] = [];
  reservations: any[] = [];
room: any = {}
/***string */
selectedDepartment: string | null = null;
selectedDate: string = "";

/***boolean */
display: boolean = false;

search : boolean = false
  constructor(
    private router: Router , 
    private route: ActivatedRoute,
    private seatService: SeatService,
    private reservationService: ReservationService,
    private roomService: RoomService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
   this.seatService.getlistSeats().subscribe((res)=>{    
    this.room= res
     // this.selectedRoom = res.name
      this.seats = res.seats
      //this.getRooms();
      this.selectedRoom = res.name
    })
    
    // this.getRooms();
    // this.getReservations(); 
  }

  getRooms() {
    if (this.selectedDepartment) {
      this.roomService.getDepartementWithRooms(this.selectedDepartment).subscribe((data: any) => {        
        this.rooms = data;
      });
    }
  }


  getSeats() {
    if (this.selectedRoom) {
      this.seatService.getSeatsByRoom(this.selectedRoom.id).subscribe((data: any) => {

        
        this.seats = data.seats || [];
        this.getReservations();
      });
    }
  }

  getReservations() {
    this.reservationService.getReservationByDate(new Date().toISOString().split('T')[0]).subscribe((data: any) => {
      this.reservations = data;
      if (this.seats.length) {
        this.seats.forEach((seat: any) => {
          seat.reserved = false;
          this.reservations.forEach((reservation: any) => {
            if (seat.id === reservation.seat.id) {
              seat.reserved = true;
              seat.reservedBy = reservation.user.firstName + ' ' + reservation.user.lastName;
            }
          });
        });
      }
    });
  }

  getSeatsForDate() {
    this.getReservations(); 
    this.getSeats(); 
  }

  onDepartmentChange() {
    this.rooms = [];
    this.selectedRoom = null;
    this.seats = [];
    this.getRooms();
  }

  onRoomChange() {
    this.getSeats();
  }

  onDateChange() {
    this.getReservations(); 
  }

  selectSeat(seat: any) {
    this.selectedSeat = seat;
    this.display = true; 
  }

  reserveSeat() {
    if (!this.selectedSeat) {
      alert('Please select a seat.');
      return;
    }

    const reservation = {
      seat: {
        id: this.selectedSeat.id
      },
      user: {
        id: this.user.id
      },
      date:new Date().toISOString().split('T')[0] // Only keep the date part
    };

    this.reservationService.createReservation(reservation).subscribe({
      next: (response) => {
        this.selectedSeat.reserved = true;
        this.selectedSeat.reservedBy = this.user.firstName + ' ' + this.user.lastName;
        this.display = false; 
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reservation successful!' });
        this.getReservations(); 
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errors[0] });
      }
    });
  }
}
