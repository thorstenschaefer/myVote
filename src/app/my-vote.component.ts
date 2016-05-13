import { Component } from '@angular/core';
import { Router, Routes , ROUTER_DIRECTIVES } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';

import { HeaderComponent } from './header';
import { AboutComponent } from './+about';
import { ViewPollComponent } from './+view-poll';
import { VotePollComponent } from './+vote-poll';
import { CreatePollComponent } from './+create-poll';
import { HomeComponent } from './+home';

@Component({
  moduleId: module.id,
  selector: 'my-vote-app',
  templateUrl: 'my-vote.component.html',
  styleUrls: ['my-vote.component.css'],
  directives: [ROUTER_DIRECTIVES, HeaderComponent]
})
@Routes([
  {path: '/', component: HomeComponent},
  {path: '/about', component: AboutComponent},
  {path: '/view-poll/:pollId', component: ViewPollComponent},
  {path: '/vote-poll/:pollId', component: VotePollComponent},
  {path: '/create-poll', component: CreatePollComponent}
])
export class MyVoteAppComponent {
  
  items: Observable<any[]>;

  constructor(
    private af : AngularFire,
    private router:Router
  ) { 
     this.items = af.list('/polls');
     
  }
}
