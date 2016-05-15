import { Component, OnInit } from '@angular/core';
import { RouteSegment, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';

import {Poll} from '../data/poll';
import {PollService} from '../data/poll.service';
import { PollQuestionComponent } from '../poll-question/poll-question.component';
import { LoadingIndicatorComponent } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-view-poll',
  templateUrl: 'view-poll.component.html',
  directives: [ROUTER_DIRECTIVES, PollQuestionComponent, LoadingIndicatorComponent],
  providers: [PollService]
})
export class ViewPollComponent implements OnInit, OnActivate {

  private poll: Poll;

  constructor(
    private pollService : PollService) {
  }

  ngOnInit() {
  }
  
  routerOnActivate(curr: RouteSegment): void {
    let pollId = curr.getParam('pollId');
    this.pollService.getById(pollId)
      .subscribe(p => this.poll = p );
  }

  private getTotalVotes() {
    // console.log(this.poll);
    if (this.poll === null) // debug
      return 0;
    return this.poll.options.map(option => option.value).reduce((a, b) => a+b);
  }
}
