import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import { debug } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) { }

  // form submission
  submit(data) {
    if(data) 
    {
      this.userService.login(data.username, data.password).subscribe((response)=>{
        this.router.navigate(['/'])
      })
    }
  }
  ngOnInit() {
  }

}
