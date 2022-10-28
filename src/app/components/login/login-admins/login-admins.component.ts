import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-admins',
  templateUrl: './login-admins.component.html',
  styleUrls: ['./login-admins.component.css']
})
export class LoginAdminsComponent implements OnInit {
  parentMessage = "srick@cebe.com";
  childMessage = this.parentMessage;


  constructor() { }

  ngOnInit(): void {
  }

}
