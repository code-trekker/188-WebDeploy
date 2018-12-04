import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/home', title: 'Home',  icon: 'fas fa-home', class: '' },
    { path: '/profile', title: 'Profile',  icon: 'fas fa-user', class: '' },
    { path: '/exercise', title: 'Exercises',  icon:'fas fa-dumbbell', class: '' },
    { path: '/routine', title: 'Routines',  icon:'fas fa-clipboard-list', class: '' },
    { path: '/workout', title: 'Workout',  icon:'far fa-calendar-check', class: '' },
    { path: '/weight', title: 'Weight',  icon:'fas fa-weight', class: '' },

    // { path: '/landing', title: 'Logout',  icon:'fas fa-sign-out-alt', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    
    if (localStorage.getItem("token") === null) {
        swal({
            position: 'center',
            type: 'warning',
            title: "You're not logged in!",
            text: 'Going back...',
            showConfirmButton: false,
            timer: 2000
          });
        setTimeout(() => { this.router.navigate(['']); }, 2000);
    }

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };

  signOut() {
      localStorage.clear();
      swal({
        position: 'center',
        type: 'warning',
        title: 'Logging out...',
        showConfirmButton: false,
        timer: 1500
      });
      swal.showLoading();
      setTimeout(() => { this.router.navigate(['']); }, 1500);
  }
}
