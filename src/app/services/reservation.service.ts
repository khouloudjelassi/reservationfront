import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BACKEND_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient , private router: Router , private messageService: MessageService) { }

  getReservations() {
    return this.http.get(`${BACKEND_URL}/reservation`);
  }

  getReservationByDate(date: any) {
    return this.http.get(`${BACKEND_URL}/reservation/date/${date}`);
  }

  createReservation(reservation: any) {
    return this.http.post(`${BACKEND_URL}/reservation`, reservation);
  }

  

}
