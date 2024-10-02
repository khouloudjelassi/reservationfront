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

  getRoom():Observable<any>{
    return this.http.get<any>(BACKEND_URL + '/room')
  }
  deleteRoom(id:number):Observable<any>{
return this.http.delete(BACKEND_URL + '/room/' + id)
  }

  getRoomWithSeats(id : number):Observable<any>{
    return this.http.get(BACKEND_URL + '/room/' + id)
  }
  getDepartementWithRooms(dep :string):Observable<any>{
    return this.http.get(BACKEND_URL + '/room/department/' + dep)
  }


   /** edit room */
  editRoom(id:number, body:any):Observable<any>{
    return this.http.put(BACKEND_URL + '/room/' + id, body)
      }
}
