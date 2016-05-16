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

  constructor(
    private userService: UserService,
    private pollService: PollService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializePoll();
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
    this.userService.getAuthentication().subscribe(user => {
      if (user === null) {
        // add error message to view!
      }
      this.poll.creatorId = (user) ? user.id : "Anonymous";
      this.poll.creatorName = (user) ? user.name : "Anonymous";
      let newPollId = this.pollService.insertPoll(this.poll);
      this.router.navigate(['/poll', 'view', this.poll.id]);
    });
    
  }
  
  addNewOption() {
    let e:KeyboardEvent = <KeyboardEvent>event;
    if (e.keyCode == 13) {
      if (this.newOptionName.length <= 0) {
        // TODO: add error message 
        return;
      } else {
        // TOTO: check if option with the same name exists
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
