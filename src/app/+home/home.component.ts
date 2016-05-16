import { Component, OnInit } from '@angular/core';
import { Router, Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { Observable } from 'rxjs';

import { Poll, PollService, PollListComponent } from '../polls';
import { UserService } from '../user';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  directives: [ROUTER_DIRECTIVES, PollListComponent],
  providers: [PollService, UserService]
})
export class HomeComponent implements OnInit {

  constructor(
    public pollService: PollService,
    public userService: UserService
  ) {}

  recentPolls : Observable<Poll[]>;
  
  ngOnInit() {
    this.recentPolls = this.pollService.getMostRecentPolls(10); 
  }
}
