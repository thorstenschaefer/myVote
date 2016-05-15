import { Component, OnInit, Inject } from '@angular/core';
import { Router, Routes , ROUTER_DIRECTIVES , ROUTER_PROVIDERS} from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';
import { MyPollsComponent } from './+my-polls';

import { HeaderComponent } from './header';
import { AboutComponent } from './+about';
import { ViewPollComponent } from './+view-poll';
import { VotePollComponent } from './+vote-poll';
import { CreatePollComponent } from './+create-poll';
import { HomeComponent } from './+home';
import { PollService } from './data/poll.service';

@Component({
  moduleId: module.id,
  selector: 'my-vote-app',
  templateUrl: 'my-vote.component.html',
  styleUrls: ['my-vote.component.css'],
  directives: [ROUTER_DIRECTIVES, HeaderComponent],
  providers: [PollService]
})
@Routes([
  {path: '/', component: HomeComponent},
  {path: '/about', component: AboutComponent},
  {path: '/view-poll/:pollId', component: ViewPollComponent},
  {path: '/vote-poll/:pollId', component: VotePollComponent},
  {path: '/create-poll', component: CreatePollComponent},
  {path: '/my-polls/:userId', component: MyPollsComponent}
])
export class MyVoteAppComponent implements OnInit {
  
  items: Observable<any[]>;

  constructor(
    private af : AngularFire,
    private router: Router,
    private pollService: PollService
  ) { }
  
  ngOnInit() {
    this.items = this.pollService.getMostRecentPolls(100);
  }
}
