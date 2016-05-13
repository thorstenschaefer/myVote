import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { AngularFire } from 'angularfire2';

import { Poll } from './poll';

@Injectable()
export class PollService {

  constructor(private af:AngularFire) {}

  static DUMMY_POLLS = [
    new Poll('1', 'Thorsten', 'TV Shows', 'What is your favorite TV show?', { "Breaking bad" : 1, "The Wire" : 5, "Sopranos" : 3, "Friends" : 0 } ),
    new Poll('2', 'Thorsten', 'Programming Languages', 'Which programming languages do you use?', { "Java" : 4, "JavaScript" : 3, "C/C++" : 0, "Go" : 1, "SmallTalk" : 0 } ),
    new Poll('3', 'Alice', 'First name', 'What is the better first name?', { "Alice" : 3, "Bob" : 3 } ),
    new Poll('4', 'Alice', 'City', 'What is your favorite city?', { "Buenos Aires" : 1, "Berlin" : 5, "New York" : 3 } ),
    new Poll('5', 'Bob', 'Football', 'Will Germany win the next football world cup?', { "Yes" : 44, "No" : 1 } )
  ];

  getMostRecentPolls(number : number) : Observable<Poll[]> {
    return Observable.of(PollService.DUMMY_POLLS);
  }
  
  getByUser(user : string) : Observable<Poll[]> {
    return Observable.of(PollService.DUMMY_POLLS);
  }
  
  getById(id: string) : Observable<Poll> {
    return Observable.of(PollService.DUMMY_POLLS.filter(poll => poll.id == id)[0]);
  }
  
  vote(poll: Poll, option: string) {
      console.log("voted for " + option + " in poll " + poll.question);
      poll.options[option] += 1;
  }

  addPoll(poll: Poll) {
    PollService.DUMMY_POLLS.push(poll);
  }
  
  insertorUpdatePoll(poll: Poll) {
    console.warn("we should persist poll " + JSON.stringify(poll));

    


    this.getById(poll.id).subscribe(existingPoll => {
        if (existingPoll) {
          console.log("Modifying existing poll");
        } else {
          console.log("Adding new poll");
          console.log(JSON.stringify(poll));
          PollService.DUMMY_POLLS.push(poll);
        }
      });
  }
}
