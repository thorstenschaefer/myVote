import { Component, OnInit } from '@angular/core';
import { Router, Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { CreatePollComponent } from './+create-poll';
import { MyPollsComponent } from './+my-polls';
import { ViewPollComponent } from './+view-poll';
import { VotePollComponent } from './+vote-poll';

@Component({
  moduleId: module.id,
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/create', component: CreatePollComponent},
  {path: '/view/:pollId', component: ViewPollComponent},
  {path: '/vote/:pollId', component: VotePollComponent},
  {path: '/user/:userId', component: MyPollsComponent}
])
export class PollsComponent implements OnInit {

  constructor(
        private router: Router
  ) {}

  ngOnInit() {
  }

}
