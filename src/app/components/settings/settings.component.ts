import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  users: any[] = [];

  currentDate = new Date();
  selectedTab: string = "users";
  numberOfSeats: number = 18;


  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  type: string = "";
  verified: boolean = false;


  constructor(private userService: UserService, private messageService: MessageService) {
    this.getAllUsers();
  }

 


  getAllUsers() {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
      this.users.reverse();
    });
  }



  createUser() {
    this.user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      type: this.type,
      verified: this.verified
    }

    this.userService.createUser(this.user).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully' });
      this.getAllUsers();
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errors[0] });
    }
    );
  }

}
