import { Component, Input, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { Router } from '@angular/router';

import { Poll, PollOption } from '../data/poll';
import { PollService } from '../data/poll.service';
import { UserService } from '../data/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-create-poll',
  templateUrl: 'create-poll.component.html',
  styleUrls: ['create-poll.component.css'],
  directives: [FORM_DIRECTIVES],
  providers: [PollService, UserService]
})
export class CreatePollComponent implements OnInit {

  @Input() pollId: string = null;

  poll: Poll;
  newOptionName: string = '';
  
  active: boolean = false;
  // creator and id should be auto-assigned

  // form = new ControlGroup({
  //   topic : new Control('', Validators.required)
  //   // question : new Control('', Validators.required)
  //   // options : new Control('', Validators.minLength(3))
  // });


  constructor(
    private userService: UserService,
    private pollService: PollService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializePoll();
  }

  initializePoll() {
    this.active = false;
    if (this.pollId) {
      console.log("Loading poll with id " + this.pollId);
      this.pollService.getById(this.pollId).subscribe(p => {
          this.poll = p;
          setTimeout(()=> this.active=true, 0);
      });   
    } else {
      console.log("Using new poll");
      this.poll = {
        id: null,
        creatorName : null,
        creatorId : null,
        timestamp : (new Date()).getTime(),
        title : null,
        question : null,
        options : []
      };
      setTimeout(()=> this.active=true, 0);
    }
  }
  
  onSubmit() {
    console.log("Submitting poll" + JSON.stringify(this.poll));
    this.userService.getAuthentication().subscribe(user => {
      console.log("Determined user");
      this.poll.creatorId = (user) ? user.id : "Anonymous";
      this.poll.creatorName = (user) ? user.name : "Anonymous";
      console.log("This goes to the service: " + JSON.stringify(this.poll));
      let newPollId = this.pollService.insertPoll(this.poll);
      this.router.navigate(['/view-poll', this.poll.id]);
    });
    
  }
  
  addNewOption() {
    let e:KeyboardEvent = <KeyboardEvent>event;
    if (e.keyCode == 13) {
      console.warn("found enter");
      if (this.newOptionName.length <= 0) {
        console.warn("Empty string");
        return;
      } else {
        console.log(this.newOptionName);
        this.poll.options.push({ name: this.newOptionName, value: 0 });
        this.newOptionName = "";
      }   
      e.preventDefault();
    }
  }
  
  deleteOption(option: PollOption) {
    console.warn("delete option " + option);
    let index = this.poll.options.indexOf(option);
    console.log("idx: " + index);
    if (index < 0) {
      console.warn("Could not find option " + JSON.stringify(option) + " in poll " + JSON.stringify(this.poll));
    } else {
      this.poll.options.splice(index, 1);
    }
  }
}
