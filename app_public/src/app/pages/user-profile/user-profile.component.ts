import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  current: any;

  constructor() { }

  ngOnInit() {
    this.current = JSON.parse( localStorage.getItem('current_business'));
    console.log(this.current.name)
    console.log(this.current.email)
    console.log(this.current.bio)
  }

}
