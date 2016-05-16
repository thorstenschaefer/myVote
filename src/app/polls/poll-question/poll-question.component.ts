import { Component, Input, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Poll } from '../data';

/**
 * Renders the question of a poll.
 */
@Component({
  moduleId: module.id,
  selector: 'app-poll-question',
  templateUrl: 'poll-question.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class PollQuestionComponent implements OnInit {

  @Input() poll: Poll;
  
  constructor() {}

  ngOnInit() {
  }

}
