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
seatId: number = 0;
  
  /*** HostListener for window load event */
  @HostListener('window:load', ['$event'])
  onWindowLoad(event: Event): void {
    this.router.navigate(['/settings']);  
  }

  /*** Arrays */
  departments: string[] = ['Software', 'Reseau'];
  rooms: Room[] = [];
  selectedRoom: any = {};
  selectedSeat: any = {};
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  seats: any[] = [];
  reservations: any[] = [];
  room: any = {};
  
  /*** Strings */
  selectedDepartment: string | null = null;
  selectedDate = new Date().toISOString().split('T')[0];
  dep: string ="";

  /*** Booleans */
  display: boolean = false;
  displayCancelDialog: boolean = false; // For cancel confirmation dialog
  search: boolean = false;
  
  seatToCancel: any = null; // The seat to cancel
  selectedRoomName: string | null = null;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private seatService: SeatService,
    private reservationService: ReservationService,
    private roomService: RoomService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getR()

    // Get department and room from route parameters
    this.route.params.subscribe(params => {
      this.selectedDepartment = params['department'];
      this.selectedRoomName = params['room'];
      this.getRooms();

    });
  }

  getR(){
    if(this.dep){
    this.roomService.getDepartementWithRooms(this.dep).subscribe((data : any) => { 
      this.room =data
      console.log("data",this.room.capacity);

    })
  }}

  getRooms() {
    if (this.selectedDepartment) {
      this.roomService.getDepartementWithRooms(this.selectedDepartment).subscribe((data: any) => {
        this.rooms = data; 
        this.selectedRoom = this.rooms[0] || null;
        this.getSeats(); 
      }, error => {
        console.error('Error fetching rooms:', error);
      });
    }
  }

  getSeats() {
    if (this.selectedRoom && this.selectedRoom.id) {
        this.seatService.getSeatsByRoom(this.selectedRoom.id).subscribe((data: any) => {
            this.seats = data.seats || [];
            console.log('Fetched Seats:', this.seats); // Log the fetched seats
            this.getReservations();
        }, error => {
            console.error('Error fetching seats:', error);
        });
    }
}


  confirmCancelReservation() {
    this.reservationService.deleteReservation(this.seatToCancel.id).subscribe({
      next: () => {
        this.displayCancelDialog = false; // Hide cancel confirmation dialog
        this.getReservations(); // Refresh reservations after cancellation
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reservation cancelled!' });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errors[0] });
      }
    });
  }

  onCancelReservation(reservationId: number) {
    console.log(reservationId, 'reservationIdreservationIdreservationId');
    
    this.seatToCancel = this.seats.find(seat => seat.id === reservationId);
    console.log(this.seatToCancel);
    
    if (this.seatToCancel) {
      this.displayCancelDialog = true; // Show cancel confirmation dialog
    }
  }

  getReservations() {
    this.reservationService.getReservationByDate(this.selectedDate).subscribe((data: any) => {
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
    this.selectedRoom = null;
    this.getRooms();
  }
  
  onRoomChange() {
    this.getSeats();
  }

  onDateChange(event: any) {
    this.selectedDate = event?.target?.value;
    this.getReservations(); 
  }

  selectSeat(seat: any) {
    this.selectedSeat = seat;
    console.log("Selected Seat:",this.selectedSeat);
    
    this.display = true; 
  }


  // reserveSeat() {
  //   if (!this.selectedSeat) {
  //     alert('Please select a seat.');
  //     return;
  //   }

  //   const    reservation = {
  //     seat: { id: this.selectedSeat.id },
  //     user: { id: this.user.id },
  //     date: this.selectedDate
  //   };
    
  //   this.reservationService.createReservation(reservation).subscribe({
  //     next: (response) => {
  //       console.log(response);
        
  //       this.selectedSeat.reserved = true;

  //       this.selectedSeat.reservedBy = this.user.firstName + ' ' + this.user.lastName;
  //       this.display = false; 
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reservation successful!' });
  //       this.getReservations(); 
  //     },
  //     error: (error) => {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errors[0] });
  //     }
  //   });
  // }
  reserveSeat() {
    if (!this.selectedSeat) {
        alert('Please select a seat.');
        return;
    }
    console.log('Before Reserving:', this.selectedSeat); // Add this line

    const reservation = {
        // seat: { id: this.seatToCancel ? this.seatToCancel?.id : this.selectedSeat.id },
        // user: { id: this.user.id },
        // date: this.selectedDate
        
    userId: this.user.id,
    seatId:this.seatToCancel ? this.seatToCancel?.id : this.selectedSeat.id,
    reservationDate:this.selectedDate

    };
console.log("zzzzzzzzzz",this.seatToCancel)

    console.log('Reservation Payload:', reservation); // Log the reservation payload

    this.reservationService.createReservation(reservation).subscribe({
        next: (response) => {
            console.log(response);
            this.selectedSeat.reserved = true;
            this.selectedSeat.reservedBy = `${this.user.firstName} ${this.user.lastName}`;
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
