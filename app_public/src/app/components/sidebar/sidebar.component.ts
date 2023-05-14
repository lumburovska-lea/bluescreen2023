import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/user-profile', title: 'Your profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public logged = 'false';

  constructor(private router: Router) { }

  ngOnInit() {
    this.logged = localStorage.getItem("logged");

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    var todelete = []
    console.log(this.menuItems)
    if(this.logged == 'true') {
      for(var i = 0; i < 4; i++) {
        console.log(this.menuItems[i].path)
        if(this.menuItems[i].path === '/login' || this.menuItems[i].path === '/register') {
          this.menuItems.splice(i, 1)
          i--;
        }
      }
    } else {
      for(var i = 0; i < 4; i++) {
        console.log(this.menuItems[i].path)
        if(this.menuItems[i].path === '/user-profile') {
          this.menuItems.splice(i, 1)
          i--;
        }
      }
    }

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
