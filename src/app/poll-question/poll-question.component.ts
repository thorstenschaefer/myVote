import { Component, Input, OnInit } from '@angular/core';
import { Poll } from '../data/poll';
import { ROUTER_DIRECTIVES } from '@angular/router';
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
