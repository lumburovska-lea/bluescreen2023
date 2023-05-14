import { Component, OnInit, OnDestroy } from '@angular/core';
import {RestService} from '../../rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';

  constructor(private rest: RestService) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  signIn() {
    this.rest.logIn(this.email, this.password)

    console.log(this.email)
  }

}
