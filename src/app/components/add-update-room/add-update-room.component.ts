import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-add-update-room',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-update-room.component.html',
 
})
export class AddUpdateRoomComponent implements OnInit{
rooms : any[] = [];

name: string = "";
capacity:number = 0;
status : string = "";
department : string = ""

  /***Form Group */
roomForm: FormGroup = this.createFomRoom()
constructor(private fb: FormBuilder,
  private roomService: RoomService,
  private messageService: MessageService
){

}
  ngOnInit(): void {
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

}, error: (err:any) => {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.errors[0] });

}
})
}
getRoom(){
 
  this.roomService.getRoom().subscribe((data: any) => {
    this.rooms = data;
  });
}
}
