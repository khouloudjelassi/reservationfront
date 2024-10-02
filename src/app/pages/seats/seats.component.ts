import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ReservationService } from 'src/app/services/reservation.service';
import { SeatService } from 'src/app/services/seat.service';
import { RoomService } from 'src/app/services/room.service'; // Import RoomService

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {
  departments: string[] = ['Software', 'Reseau']; // List of departments
  selectedDepartment: string | null = null; // Make sure this property exists
  rooms: any[] = [];
  selectedRoom: any = null; // Ensure this property is defined
  date = this.route.snapshot.paramMap.get('date');
  selectedSeat: any = {};
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  display: boolean = false;
  seats: any[] = [];
  reservations: any[] = [];
  
  currentDate = this.date ? new Date(this.date) : new Date();

  constructor(
    private route: ActivatedRoute,
    private seatService: SeatService,
    private reservationService: ReservationService,
    private roomService: RoomService, // Inject RoomService
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getRooms();
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
        console.log(data);
        
        this.seats = data;
        this.getReservations();
      });
    }
  }

  getReservations() {
    this.reservationService.getReservationByDate(this.date).subscribe((data: any) => {
      this.reservations = data;
      if(this.seats.length){
      this.seats.forEach((seat: any) => {
        console.log(seat);
        
        seat.reserved = false;
        this.reservations.forEach((reservation: any) => {
          if (seat.id === reservation.seat.id) {
            seat.reserved = true;
            seat.reservedBy = reservation.user.firstName + ' ' + reservation.user.lastName;
          }
        });
      });}
    });
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

  // Other methods remain unchanged...
}
