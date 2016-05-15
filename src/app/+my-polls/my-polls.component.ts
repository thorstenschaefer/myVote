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
  styleUrls: ['my-polls.component.css'],
  directives: [PollListComponent]
})
export class MyPollsComponent implements OnInit {

  constructor(public pollService: PollService) {}

  // @Input() userId: string;
  
  myPolls : Observable<Poll[]>;
  
  ngOnInit() {
    // this.myPolls = this.pollService.getByUserId(this.userId);
  }
  
  routerOnActivate(curr: RouteSegment): void {
    let userId = curr.getParam('userId');
    console.log("Router activate with uid" + userId);
    this.myPolls = this.pollService.getByUserName(userId);
  }

}
