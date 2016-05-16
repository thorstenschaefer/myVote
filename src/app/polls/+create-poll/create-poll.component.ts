import { Component, Input, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { Router } from '@angular/router';

import { Poll, PollOption, PollService } from '../data';
import { UserService } from '../../user';

@Component({
  moduleId: module.id,
  selector: 'app-create-poll',
  templateUrl: 'create-poll.component.html',
  directives: [FORM_DIRECTIVES]
})
export class CreatePollComponent implements OnInit {

  @Input() pollId: string = null;

  poll: Poll;
  newOptionName: string = '';
  messageOptionErrors: string[];
  messages: string[];
  
  constructor(
    private userService: UserService,
    private pollService: PollService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializePoll();
    this.messageOptionErrors = [];
    this.messages = [];
  }

  initializePoll() {
    if (this.pollId) {
      this.pollService.getById(this.pollId).subscribe(p => {
          this.poll = p;
      });   
    } else {
      this.poll = {
        id: null,
        creatorName : null,
        creatorId : null,
        timestamp : (new Date()).getTime(),
        title : null,
        question : null,
        options : []
      };
    }
  }
  
  onSubmit() {
    this.messages = [];
    this.userService.getAuthentication().subscribe(user => {
      if (user === null) {
        this.messages.push('Access restricted to authenticated users.');
        return;
      }
      this.poll.creatorId = (user) ? user.id : "Anonymous";
      this.poll.creatorName = (user) ? user.name : "Anonymous";
      let newPollId = this.pollService.insertPoll(this.poll);
      this.router.navigate(['/poll', 'view', this.poll.id, { newlyCreated: true } ]);
    });
    
  }
  
  addNewOption() {
    let e:KeyboardEvent = <KeyboardEvent>event;
    if (e.keyCode == 13) {
      this.messageOptionErrors = [];
      if (this.newOptionName.length <= 0) {
        this.messageOptionErrors.push('Please enter the name of your poll option and then confirm with ENTER.');
      } else if (this.poll.options.filter(o => o.name === this.newOptionName).length > 0) {
        this.messageOptionErrors.push('An option needs to have a unique name.');
      } else {
        this.poll.options.push({ name: this.newOptionName, value: 0 });
        this.newOptionName = "";
      }   
      e.preventDefault();
    }
  }
  
  deleteOption(option: PollOption) {
    let index = this.poll.options.indexOf(option);
    if (index < 0) {
      console.warn("Could not find option " + JSON.stringify(option) + " in poll " + JSON.stringify(this.poll));
    } else {
      this.poll.options.splice(index, 1);
    }
  }
}
