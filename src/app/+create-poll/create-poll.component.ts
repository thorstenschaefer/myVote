import { Component, Input, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';

import { Poll } from '../data/poll';
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
    private pollService: PollService
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
      this.poll = new Poll('', '', 'test', 'hello', {});
      setTimeout(()=> this.active=true, 0);
    }
  }
  
  onSubmit() {
    this.userService.getAuthentication().subscribe(user => {
      this.poll.creator = user.name;
      this.pollService.insertorUpdatePoll(this.poll);
    });
  }
  
  addNewOption() {
    let e:KeyboardEvent = <KeyboardEvent>event;
    if (e.keyCode == 13) {
      console.warn("found enter");
      console.log(this.newOptionName);
      this.poll.options[this.newOptionName] = 0;
      this.newOptionName = "";
      e.preventDefault();      
    }
  }
  
  deleteOption(option: string) {
    console.warn("delete option " + option);
    delete this.poll.options[option];
  }
}
