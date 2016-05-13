import { Component, Input, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Poll } from '../data/poll';

@Component({
  moduleId: module.id,
  selector: 'app-poll-list',
  templateUrl: 'poll-list.component.html',
  styleUrls: ['poll-list.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class PollListComponent implements OnInit {

  @Input() polls : Poll[] = [];
  
  constructor() {}

  ngOnInit() {
  }

}
