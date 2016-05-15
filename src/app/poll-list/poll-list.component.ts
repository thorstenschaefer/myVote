import { Component, Input, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Observable } from 'rxjs';

import { Poll } from '../data/poll';
import { PollService } from '../data/poll.service';
import { UserService } from '../data/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-poll-list',
  templateUrl: 'poll-list.component.html',
  styleUrls: ['poll-list.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [PollService, UserService ]
})
export class PollListComponent implements OnInit {

  @Input() polls : Poll[] = [];
  
  constructor(
    private userService: UserService, 
    private pollService: PollService
  ) {}

  ngOnInit() {
  }

  getVotes(poll: Poll): number {
    return poll.options.map((option) => option.value).reduce((prev, curr) => prev+curr);
  }
  
  deletePoll(pollId: string) {
    this.pollService.delete(pollId);
  }
  
  /**
   * Returns true if the poll is owned by the currently logged in user
   */
  isOwnPoll(poll):Observable<boolean> {
    return this.userService.getAuthentication()
      .map(loggedInUser => {
        if (loggedInUser === null)
          return false;
        return loggedInUser.name === poll.creatorName;
      });
  }
}
