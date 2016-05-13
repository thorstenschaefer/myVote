import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { MyVoteAppComponent, environment } from './app/';

import {ROUTER_PROVIDERS} from '@angular/router';
import {FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthMethods, AuthProviders } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(MyVoteAppComponent, [
  FIREBASE_PROVIDERS,
  defaultFirebase('https://shining-fire-5089.firebaseio.com'),
  firebaseAuthConfig({
    method : AuthMethods.Popup,
    provider : AuthProviders.Github
  }),
  ROUTER_PROVIDERS
]);
