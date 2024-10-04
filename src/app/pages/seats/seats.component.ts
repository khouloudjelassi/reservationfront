import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ReservationService } from 'src/app/services/reservation.service';
import { SeatService } from 'src/app/services/seat.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {
  departments: string[] = ['Software', 'Reseau'];
  selectedDepartment: string | null = null;
  rooms: any[] = [];
  selectedRoom: any = null;
  date = this.route.snapshot.paramMap.get('date');
  selectedSeat: any = {};
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  display: boolean = false;
  seats: any[] = [];
  reservations: any[] = [];
  selectedDate: string = "";

  currentDate: Date = this.date ? new Date(this.date) : new Date();

  constructor(
    private route: ActivatedRoute,
    private seatService: SeatService,
    private reservationService: ReservationService,
    private roomService: RoomService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getRooms();
    this.getReservations(); // Load reservations for the initial date
  }

  getRooms() {
    if (this.selectedDepartment) {
      this.roomService.getDepartementWithRooms(this.selectedDepartment).subscribe((data: any) => {
        this.rooms = data;
      });
    }
  }

  logout() {
    localStorage.clear();
    window.location.reload();
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
    this.reservationService.getReservationByDate(this.currentDate.toISOString().split('T')[0]).subscribe((data: any) => {
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
    this.currentDate = new Date(this.selectedDate); // Update currentDate to the selected date
    this.getReservations(); // Refresh reservations for the new date
    this.getSeats(); // Get available seats for the new date
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
    this.getReservations(); // Fetch reservations for the newly selected date
  }

  selectSeat(seat: any) {
    this.selectedSeat = seat;
    this.display = true; // Show the confirmation dialog
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
      date: this.currentDate.toISOString().split('T')[0] // Only keep the date part
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
