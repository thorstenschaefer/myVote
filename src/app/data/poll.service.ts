import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Poll, PollOption } from './poll';

@Injectable()
export class PollService {

  constructor(private af:AngularFire) {
    this.allPolls = af.list("/polls");
  }

  allPolls: FirebaseListObservable<any[]>;
  
  getMostRecentPolls(number : number) : Observable<Poll[]> {
    console.log("get most recent polls");
    this.allPolls.subscribe(x => console.warn(JSON.stringify(x)));
    return this.allPolls;
  } 
  
  // getByUser(user : string) : Observable<Poll[]> {
  //   return Observable.of(PollService.DUMMY_POLLS);
  // }
  
  getById(id: string) : Observable<Poll> {
    console.log("Retrieve poll by id " + id);
    let o =  this.af.object("/polls/" + id);
    // we could keep the key in the object with { preserveSnapshot: true } as second argument to the object method
    return o.map(o => { o.id = id; return o});
  }
  
  delete(id: string) {
    this.af.database.object('/polls/' + id).remove();
  }
  
  vote(poll: Poll, option: PollOption) {
      console.log("voted for " + option + " in poll " + poll.question);
      console.log("Before: " + JSON.stringify(poll));
      option.value += 1;
      console.log("After: " + JSON.stringify(poll));
      console.warn("we dont perform an update yet...");
      
      let index = poll.options.indexOf(option);
      
      var optionReference = this.af.database 
      var upvotesRef = new Firebase('https://docs-examples.firebaseio.com/android/saving-data/fireblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes');
upvotesRef.transaction(function (current_value) {
  return (current_value || 0) + 1;
});
      
  }

  addPoll(poll: Poll) {
    // PollService.DUMMY_POLLS.push(poll);
  }
  
  insertorUpdatePoll(poll: Poll) {
    console.warn("we should persist poll " + JSON.stringify(poll));
    let promise = this.allPolls.push(poll);
    let id = promise.key();
    poll.id = id;
    return id;
  }
}
