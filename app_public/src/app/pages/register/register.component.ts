import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private name = '';
  private email = '';
  private bio = '';
  private password = '';

  constructor() { }

  ngOnInit() {
  }

}
