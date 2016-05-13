import { Component, OnInit } from '@angular/core';
import { RouteSegment, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';
import {Poll} from '../data/poll';
import {PollService} from '../data/poll.service';

@Component({
  moduleId: module.id,
  selector: 'app-view-poll',
  templateUrl: 'view-poll.component.html',
  styleUrls: ['view-poll.component.css'],
  directives: [ROUTER_DIRECTIVES],
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

}
