import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-add-update-room',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TableModule, ButtonModule,
    DialogModule, SweetAlert2Module
  ],
  templateUrl: './add-update-room.component.html',
 
})
export class AddUpdateRoomComponent implements OnInit{
  /***array */
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
  /***Form Group */
roomForm: FormGroup = this.createFomRoom()
/**boolean */
mode: boolean = false
visible: boolean = false
/***string */
msg: string = ''
constructor(private fb: FormBuilder,
  private roomService: RoomService,
  private messageService: MessageService,
  private router: Router , 
){

}
  ngOnInit(): void {
    this.mode= false
this.getRoom()  }

/*** create room form */
createFomRoom(data?:any): FormGroup{
return this.fb.group({
  id: [data && data?.id ? data?.id : null],
  name: [data && data?.name ? data?.name : '' ,[Validators.required]],
  capacity: [data && data?.capacity ? data?.capacity : 0, [Validators.required]],
  status: [data && data?.status ? data?.status : '', [Validators.required]],
  department: [data && data?.department ? data?.department : '', [Validators.required]],
})
}
/*** add room function */
createNewRomm(){
this.roomService.addRooms(this.roomForm.value).subscribe({
  next: (data:any) => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'room added successfully' });
    this.roomForm = this.createFomRoom()
    this.getRoom()
}, error: (err:any) => {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.errors[0] });

}
})
}

/***update room function */
updateRoom() {
  this.roomService.editRoom(this.room.id, this.roomForm.value).subscribe({
    next: (data:any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'room updated successfully' });
      this.clearForm()
      this.getRoom()
  }, error: (err:any) => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.errors[0] });
  
  }
  })
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
selectRoom(element:any, mode:string){
  this.room = element
  this.msg = ''
  if(mode ==='delete'){
   this.msg = `Are you sure to delete this room: "${element.name}" !`}
   else if(mode ==='details'){
    this.seats = element?.seats
    this.router.navigate(['/seats', new Date().toISOString().split('T')[0]]); 

   } else {
    this.mode= true
    this.roomForm = this.createFomRoom(element)
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
/*** clean form */
clearForm(){
  this.roomForm = this.createFomRoom()
  this.mode= false
}


}
