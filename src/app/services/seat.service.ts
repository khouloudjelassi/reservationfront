import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BACKEND_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(private http: HttpClient , private router: Router , private messageService: MessageService) { }

  getSeats() {
    return this.http.get(`${BACKEND_URL}/seat`);
  }

}
