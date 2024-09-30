import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../config/config';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient , private messageService: MessageService) { }

  getUsers() {
    return this.http.get(`${BACKEND_URL}/user`);
  }

  createUser(user: any) {
    return this.http.post(`${BACKEND_URL}/user`, user);
  }





}
