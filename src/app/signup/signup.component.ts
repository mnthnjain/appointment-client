import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  // registration form submission
  submit(data) {
    if(data) 
    {
      this.userService.signup(data).subscribe((response)=>{
        this.router.navigate(['/'])
      })
    }
  } 
  ngOnInit() {
  }

}
