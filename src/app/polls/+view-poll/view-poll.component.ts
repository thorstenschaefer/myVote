import { Component, OnInit } from '@angular/core';
import { RouteSegment, Router, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';

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
  private message: string;
  
  constructor(
    private pollService : PollService,
    private router: Router
  ) { }

  ngOnInit() {

  }
  
  routerOnActivate(curr: RouteSegment): void {
    let pollId = curr.getParam('pollId');
    
    // add a message if the poll was just created
    // this is not the most elegant way, but the router doesn't provide the
    // possibility to get the external url of the tree w/o the params :/
    if (curr.getParam('newlyCreated')) {
      let url = window.location.href;
      let paramIndex = url.lastIndexOf(';');
      let newUrl = url.substring(0, paramIndex);
      this.message = 'You can share your poll with the URL: ' + newUrl;
    }
    
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
