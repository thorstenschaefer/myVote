import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';
import { Observable } from 'rxjs';

import { User } from '../data/user';

const FAKE_LOGIN_DATA = { email: 'thorstenschaefer@outlook.com', password: 'fakepassword' };
const FAKE_LOGIN_CONFIG = { provider: AuthProviders.Password, method: AuthMethods.Password };
const FAKE_USER_DETAILS = { "id": "FakeUser", "name": "Fake User" };

@Injectable()
export class UserService {

  constructor(private af: AngularFire) {}
  
  /** Returns an observable of string with the user ID. For non-authenticated users, this is null */
  getAuthentication(): Observable<User> {
    return this.af.auth.map(auth => 
      auth === null 
        ? null 
        : auth.uid.startsWith('github') ? { "id" : auth.uid, "name" : auth.github.username } : FAKE_USER_DETAILS);
  }

  isLoggedIn(): Observable<boolean> {
    return this.getAuthentication().map(auth => auth !== null);
  }
  
  login(): Promise<FirebaseAuthState> {
    console.log("Login called");
    return this.af.auth.login();
  }
    
  fakeLogin(): Promise<FirebaseAuthState> {
    console.log("Fake login called");
    return this.af.auth.login(FAKE_LOGIN_DATA, FAKE_LOGIN_CONFIG);
  }
  
  logout() {
    console.log("Logout called");
    this.af.auth.logout();
  }
}
