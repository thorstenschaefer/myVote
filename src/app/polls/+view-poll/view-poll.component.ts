import { Component, OnInit } from '@angular/core';
import { RouteSegment, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';

import { Poll, PollOption, PollService } from '../data';
import { PollQuestionComponent } from '../poll-question';
import { LoadingIndicatorComponent } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-view-poll',
  templateUrl: 'view-poll.component.html',
  directives: [ROUTER_DIRECTIVES, PollQuestionComponent, LoadingIndicatorComponent]
})
export class ViewPollComponent implements OnInit, OnActivate {

  private poll: Poll;
  private totalVotes: number;
  private highestVotes: number;
  
  constructor(
    private pollService : PollService) {
  }

  ngOnInit() {

  }
  
  routerOnActivate(curr: RouteSegment): void {
    let pollId = curr.getParam('pollId');
    this.pollService.getById(pollId)
      .subscribe(p => {
        this.poll = p;
        if (p === null)
          return;
          
        // update total votes and highestVotes
        this.highestVotes = p.options.map(o => o.value).reduce((a,b) => Math.max(a,b));
        this.totalVotes = p.options.map(o => o.value).reduce((a,b) => a+b);
      } );
  }

  private getPercentage(option: PollOption):number {
    return option.value / this.totalVotes;
  }
  
  private isBestOption(option:PollOption):boolean {
    return option.value === this.highestVotes;
  }
}
