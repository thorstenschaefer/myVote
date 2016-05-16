import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { UserService } from '../user';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  directives: [ROUTER_DIRECTIVES]
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
      this.router.navigate(['/poll', 'user', value.github.username]);
    }).catch(reason => alert(reason));
  }
  
  fakeLogin() {
    let promise = this.userService.fakeLogin();
    // after successful login, redirect to user page
    promise.then(value => { 
      this.router.navigate(['/poll', 'user', 'Fake User']);
    }).catch(reason => alert(reason));
  }

}
