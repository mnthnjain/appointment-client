import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})

export class AppointmentComponent implements OnInit {
  // data for this particular appointment  
  @Input('data') appointmentData: any;
  
  // function to remove this appointment
  @Output() deleteAppointmentcb: EventEmitter<Number> = new EventEmitter<Number>();;
  
  // variable to tell if its a new appointment
  @Input() newAppointment: Boolean;

  // position in list of all the appointment
  @Input() index: Number
  public notInvitedPersons: any;
  public editing: boolean = false
  public AllUsers: any;
  
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  constructor(public userService: UserService) {
  }


  ngOnInit() {
    // using already fetched all users from user servce
    this.AllUsers = this.userService.users
    
    // option for dropdown selector
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'email',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    if (this.newAppointment) {
      this.editing = true;
    }
  }

  // in case of deleting any appointment
  delete() {
    this.deleteAppointmentcb.emit(this.index)
  }

  // saving, updating or creating a new appointment
  save() {
    if (!this.editing) {
      this.editing = true;
      return
    }
    this.editing = false;

    if (this.newAppointment) {
      return this.userService.addAppointment(this.appointmentData).subscribe(res => {
        console.log(res);
        this.newAppointment = false
      })
    }
    return this.userService.updateAppointment(this.appointmentData).subscribe((res) => {
      console.log(res)
    })
  }



}
