import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-add-update-room',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TableModule, ButtonModule,
    DialogModule 
  ],
  templateUrl: './add-update-room.component.html',
 
})
export class AddUpdateRoomComponent implements OnInit{
  /***array */
  room: any = {}
rooms : any[] = [];
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
constructor(private fb: FormBuilder,
  private roomService: RoomService,
  private messageService: MessageService
){

}
  ngOnInit(): void {
    this.mode= false
this.getRoom()  }
/*** create room form */
createFomRoom(data?:any): FormGroup{
return this.fb.group({
  name: [data && data?.name ? data?.name : '' ,[Validators.required]],
  capacity: [data && data?.capacity ? data?.capacity : 0, [Validators.required]],
  status: [data && data?.status ? data?.status : '', [Validators.required]],
  department: [data && data?.department ? data?.department : '', [Validators.required]],
})
}
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
getRoom(){
 
  this.roomService.getRoom().subscribe({
    next: (data:any) => {
  this.rooms = data
  
  }, error: (err:any) => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.errors[0] });
  
  }
  })
}
selectRoom(element:any){
  this.mode= true
  this.roomForm = this.createFomRoom(element)
}
openModal(element:any){
  this.room = element
  this.visible = true
}
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
clearForm(){
  this.roomForm = this.createFomRoom()
}
}
