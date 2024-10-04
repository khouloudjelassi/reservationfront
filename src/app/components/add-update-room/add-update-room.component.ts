import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-add-update-room',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, 
  ],
  templateUrl: './add-update-room.component.html',
 
})
export class AddUpdateRoomComponent implements OnInit{
/***Input */
@Input()set roomData(value:any){
  if(value) {
    this.mode= true
    this.roomForm = this.createFomRoom(value)
  } else{
    this.mode= false
    this.roomForm = this.createFomRoom()
  }
}
/***Output */
@Output() modalClose:EventEmitter<any>=new EventEmitter();
@Output() refreshData:EventEmitter<any>=new EventEmitter()  /***Form Group */
roomForm: FormGroup = this.createFomRoom()
/**boolean */
mode: boolean = false
visible: boolean = false
/***string */
msg: string = ''
constructor(private fb: FormBuilder,
  private roomService: RoomService,
  private messageService: MessageService,
){

}
  ngOnInit(): void {
    this.mode= false
  }

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
    this.clearForm()
    this.refreshData.emit(true)
}, error: (err:any) => {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.errors[0] });

}
})
}

/***update room function */
updateRoom() {
  this.roomService.editRoom(this.roomForm.value.id, this.roomForm.value).subscribe({
    next: (data:any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'room updated successfully' });
      this.clearForm()
      this.refreshData.emit(true)
    }, error: (err:any) => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.errors[0] });
  
  }
  })
}


/*** clean form */
clearForm(){
  this.roomForm = this.createFomRoom()
 this.mode= false
 this.modalClose.emit(true)
}


}
