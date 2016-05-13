import { Component, OnInit } from '@angular/core';
import { PollService } from '../data/poll.service'
import { Router, Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { PollListComponent } from '../poll-list';
import { UserService } from '../data/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [ROUTER_DIRECTIVES, PollListComponent],
  providers: [PollService, UserService]
})
export class HomeComponent implements OnInit {

  constructor(
    public pollService: PollService,
    public userService: UserService
  ) {}

  recentPolls = [];
  
  ngOnInit() {
    this.pollService.getMostRecentPolls(10).subscribe(polls => this.recentPolls = polls); 
  }
}
