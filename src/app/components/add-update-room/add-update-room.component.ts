import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-add-update-room',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-update-room.component.html',
 
})
export class AddUpdateRoomComponent {

  /***Form Group */
roomForm: FormGroup = this.createFomRoom()
constructor(private fb: FormBuilder,
  private roomService: RoomService,
  private messageService: MessageService
){

}
/*** create room form */
createFomRoom(data?:any): FormGroup{
return this.fb.group({
  name: [data && data?.name ? data?.name : '' ,[Validators.required]],
  capacity: [data && data?.capacity ? data?.capacity : 0, [Validators.required]],
  status: [data && data?.status ? data?.status : '', [Validators.required]],
  departement: [data && data?.departement ? data?.departement : '', [Validators.required]],
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
}
