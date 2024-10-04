import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BACKEND_URL } from '../config/config';
import { Seat } from '../models/seat';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  listSeats = new BehaviorSubject<Object>({});

  constructor(private http: HttpClient , private router: Router , private messageService: MessageService) { }

  getSeats() {
    return this.http.get(`${BACKEND_URL}/seat`);
  }

  getSeat(): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${BACKEND_URL}/seat`); // Specify that it returns an Observable of Seat[]
  }

  getSeatsByRoom(roomId: number): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${BACKEND_URL}/room/${roomId}`); // Adjust this URL according to your backend
  }
  setlistSeats(value: Object) {
    this.listSeats.next(value);
  }
  getlistSeats(): Observable<any> {
    return this.listSeats.asObservable();
  }
}
