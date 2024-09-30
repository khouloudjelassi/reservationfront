import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../config/config';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient , private router: Router , private messageService: MessageService) { }

  login(user: any) {

    return this.http.post(`${BACKEND_URL}/auth/login`, user).subscribe((res: any) => {
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigate(['/seats', new Date().toISOString().split('T')[0]]); 

    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errors[0] });
    }
    );



  }
}
