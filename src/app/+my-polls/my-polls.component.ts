import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteSegment, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';

import { Poll } from '../data/poll';
import { PollService } from '../data/poll.service'
import { PollListComponent } from '../poll-list';

@Component({
  moduleId: module.id,
  selector: 'app-my-polls',
  templateUrl: 'my-polls.component.html',
  directives: [PollListComponent]
})
export class MyPollsComponent implements OnInit {

  constructor(public pollService: PollService) {}

  myPolls : Observable<Poll[]>;
  userId : string;
  
  ngOnInit() {
  }
  
  routerOnActivate(curr: RouteSegment): void {
    this.userId = curr.getParam('userId');
    this.myPolls = this.pollService.getByUserName(this.userId);
  }
  
}
