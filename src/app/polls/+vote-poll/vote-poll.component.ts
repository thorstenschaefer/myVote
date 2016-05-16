import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, RouteSegment, OnActivate } from '@angular/router';

import { Poll, PollOption, PollService } from '../data';
import { PollQuestionComponent } from '../poll-question';
import { LoadingIndicatorComponent } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-vote-poll',
  templateUrl: 'vote-poll.component.html',
  directives: [ROUTER_DIRECTIVES, PollQuestionComponent, LoadingIndicatorComponent]
})
export class VotePollComponent implements OnInit {

  private poll: Poll;
  
  constructor(
    private router : Router,
    private pollService : PollService
    ) { }

  ngOnInit() {
  }
  
  routerOnActivate(curr: RouteSegment): void {
    let pollId = curr.getParam('pollId');
    this.pollService.getById(pollId)
      .subscribe(p => this.poll = p);
  }

  vote(option: PollOption) {
    this.pollService.vote(this.poll, option);
    this.router.navigate(['/poll', 'view', this.poll.id]);
  }
}
