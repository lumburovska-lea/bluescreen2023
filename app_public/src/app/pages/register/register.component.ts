import { Component, OnInit } from '@angular/core';
import {RestService} from '../../rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name: string = '';
  email: string = '';
  bio: string = '';
  password: string = '';

  constructor(private rest: RestService) { }

  ngOnInit() {
  }

  register() {
    this.rest.register(this.email, this.password, this.name, this.bio)
  }

}
