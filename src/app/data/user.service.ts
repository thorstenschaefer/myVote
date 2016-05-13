import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';

import { User } from '../data/user';
@Injectable()
export class UserService {

  constructor(private af: AngularFire) {}
  
  /** Returns an observable of string with the user ID. For non-authenticated users, this is null */
  getAuthentication(): Observable<User> {
    return this.af.auth.map(auth => 
      auth === null 
        ? null 
        : { "id" : auth.uid, "name" : auth.github.username });
  }

  isLoggedIn(): Observable<boolean> {
    return this.getAuthentication().map(auth => auth !== null);
  }
  
  login() {
    console.log("Login called");
    this.af.auth.login();
  }
  
  logout() {
    console.log("Logout called");
    this.af.auth.logout();
  }
}
