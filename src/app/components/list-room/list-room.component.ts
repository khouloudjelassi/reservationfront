import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { RoomService } from 'src/app/services/room.service';
import { AddUpdateRoomComponent } from "../add-update-room/add-update-room.component";
import { SeatService } from 'src/app/services/seat.service';

@Component({
  selector: 'app-list-room',
  standalone: true,
  imports: [TableModule, ButtonModule,
    DialogModule, SweetAlert2Module, CommonModule, AddUpdateRoomComponent],
  templateUrl: './list-room.component.html',
  //styleUrl: './list-room.component.css'
})
export class ListRoomComponent implements OnInit {
  /***array */
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  room: any = {}
rooms : any[] = [];
seats: any[] = []
displayColumns: any[] =[
  { field: 'name', header: 'Room Name' },
  { field: 'capacity', header: 'Capacity' },
  { field: 'status', header: 'Status' },
  { field: 'department', header: 'Department' },
  { field: 'actions', header: 'Actions' }
];
/**boolean */
visible: boolean = false
/***string */
msg: string = ''
action: string = ''
  constructor(
    private roomService: RoomService,
    private messageService: MessageService,
    private router: Router , 
    private seatsService:  SeatService
  ){
  
  }
ngOnInit(): void {
  this.getRoom()
}
/**** list of rooms  */
getRoom(){
 
  this.roomService.getRoom().subscribe({
    next: (data:any) => {
  this.rooms = data
  
  }, error: (err:any) => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.errors[0] });
  
  }
  })
}

/***select room for more action (delete, update and list of seats) */
// selectRoom(element:any, mode:string){
//   this.room = element
//   this.msg = ''
//   this.action = mode
//   if(mode ==='delete'){
//    this.msg = `Are you sure to delete this room: "${element.name}" !`}
//    else if(mode ==='details'){
//     this.seats = element?.seats
//     this.seatsService.setlistSeats(element)
//     this.router.navigate(['/seats']); 

//    } else {
//     this.visible= true
//    }
// }
selectRoom(element: any, mode: string) {
  this.room = element;
  this.msg = '';
  this.action = mode;
  if (mode === 'delete') {
    this.msg = `Are you sure to delete this room: "${element.name}"!`;
  } else if (mode === 'details') {
    this.seats = element?.seats;
    this.seatsService.setlistSeats(element);
    this.router.navigate(['/seats', element.department, element.name]); // Pass department and room name
  } else {
    this.visible = true;
  }
}

/***delete room function */
deleteRoom(id:number){
  this.roomService.deleteRoom(id).subscribe({
    next: (res:any) =>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'room deleted successfully' });
this.getRoom()
    },
    error: (err:any)=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.errors[0] });

    }
  })
}
}
