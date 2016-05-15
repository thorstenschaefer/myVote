import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, RouteSegment, OnActivate } from '@angular/router';

import {Poll, PollOption} from '../data/poll';
import {PollService} from '../data/poll.service';
import {PollQuestionComponent} from '../poll-question/poll-question.component';

@Component({
  moduleId: module.id,
  selector: 'app-vote-poll',
  templateUrl: 'vote-poll.component.html',
  styleUrls: ['vote-poll.component.css'],
  providers: [PollService],
  directives: [ROUTER_DIRECTIVES, PollQuestionComponent]
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
    this.router.navigate(['/view-poll', this.poll.id]);
  }
}
