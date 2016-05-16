import { Component, OnInit, Inject } from '@angular/core';
import { Router, Routes , ROUTER_DIRECTIVES , ROUTER_PROVIDERS} from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';

import { HeaderComponent } from './header';
import { HomeComponent } from './+home';
import { AboutComponent } from './+about';
import { PollsComponent, PollService } from './polls';
import { UserService } from './user';

@Component({
  moduleId: module.id,
  selector: 'my-vote-app',
  templateUrl: 'my-vote.component.html',
  directives: [ROUTER_DIRECTIVES, HeaderComponent],
  providers: [PollService, UserService]
})
@Routes([
  {path: '/', component: HomeComponent},
  {path: '/about', component: AboutComponent},
  {path: '/poll', component: PollsComponent}
])
export class MyVoteAppComponent implements OnInit {
  
  items: Observable<any[]>;

  constructor(
    private af : AngularFire,
    private router: Router
  ) { }
  
  ngOnInit() {
  }
}
