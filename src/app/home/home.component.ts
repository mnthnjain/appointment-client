import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // check if the user exists or not, if yes load appointments, else ask him to register
  public userInfo: any;
  public appointments: Array<any> = []

  constructor(private userService: UserService) { }

  ngOnInit() {
    // get the current user info to check logged in status
    this.userService.getUserInfo().subscribe((response) => {
      this.userInfo = response;
      // get all the users
      this.userService.getUsers();
      
      this.fetchAppointmentsForUser()
    })
  }

  // fetch all the appointment for the current user 
  fetchAppointmentsForUser() {
    this.userService.getAppointments().subscribe((response) => {
      this.appointments = []
      this.appointments = this.appointments.concat(response)
    })
  }

  logout() {
    this.userService.logout().subscribe((response) => {
      delete (this.userInfo)
    })
  }

  deleteAppointment(e) {
    // if this is an already existing appointment, or else user decide to delete the new appointment he was creating
    if (this.appointments[e]._id) {
      return this.userService.deleteAppointment(this.appointments[e]).subscribe(() => {
        this.appointments = this.appointments.slice(0, e).concat(this.appointments.slice(e + 1, this.appointments.length))
      })
    }
    else {
      this.appointments = this.appointments.slice(0, e).concat(this.appointments.slice(e + 1, this.appointments.length))
    }
  }

}

