import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private http: HttpClient) { }
  /** add new room */
  addRooms(body: any): Observable<any>{
    return this.http.post<any>(BACKEND_URL + '/room', body)
  }
}
