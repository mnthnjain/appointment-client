import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users;
  constructor(private http: HttpClient) {
  }

  // get list all the users, required for  
  getUsers() {
    return this.http.get('/api/users').subscribe((response) => {
      this.users = response
    })
  }

  login(username, password) {
    return this.http.post('/auth/login?username=' + username + '&password=' + password, { username, password })
  }

  signup(data) {
    return this.http.post('/auth/signup', data)
  }

  logout() {
    return this.http.get('/auth/logout')
  }

  // get current user info
  getUserInfo() {
    return this.http.get('/api/userinfo')
  }

  // get current user appointmnets
  getAppointments() {
    return this.http.get('/api/appointment')
  }

  // update a particular appointment for current user
  updateAppointment(appointmentData) {
    return this.http.put('/api/appointment', appointmentData)
  }

  // add a new appointment for current user
  addAppointment(appointmentData) {
    return this.http.post('/api/appointment', appointmentData)
  }
  
  deleteAppointment(appointmentData) {
    return this.http.request('DELETE', '/api/appointment', { body: appointmentData })
  }
}
