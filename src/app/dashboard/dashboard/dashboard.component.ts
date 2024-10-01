import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RoomService } from 'src/app/services/room.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableModule  ],
  templateUrl: './dashboard.component.html',
 // styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  /***array */
  rooms: any[]= []
  //rooms: MatTableDataSource<[]> = new MatTableDataSource()
  displayColumnsLabel: string[] = ['Room Name', 'Capacity', 'Status', 'Department']
  displayColumns: any[] =[
    { field: 'name', header: 'Room Name' },
    { field: 'capacity', header: 'Capacity' },
    { field: 'status', header: 'Status' },
    { field: 'department', header: 'Department' }
];

  constructor(  private roomService: RoomService,
    private messageService: MessageService){}
  ngOnInit(): void {
    this.getRoom()
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
}
