import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private loginService: AuthService,
     private router: Router , 
     private messageService: MessageService){}

  login() {
    this.loginService.login({email: this.email, password: this.password}).subscribe({
      next: (data:any) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/seats', new Date().toISOString().split('T')[0]]); 
    }, error: (err:any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.errors[0] });    
    }
    });
  }

}
