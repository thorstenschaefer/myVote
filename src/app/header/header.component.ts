import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { UserService } from '../data/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {

  constructor(
    private router:Router,
    private userService:UserService
  ) {}

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  login() {
    let promise = this.userService.login();
    // after successful login, redirect to user page
    promise.then(value => {
      this.router.navigate(['/polls', value.github.username]);
    });
  }

}
