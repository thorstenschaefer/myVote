import { Injectable, Inject } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { AngularFire, FirebaseRef, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { Poll, PollOption } from './poll';

@Injectable()
export class PollService {

  constructor(
    private af:AngularFire,
    @Inject(FirebaseRef) private ref : Firebase
    ) {
    this.allPolls = af.list("/polls");
  }

  // contains all posts
  allPolls: FirebaseListObservable<any[]>;
  
  /**
   * Returns the most recent polls
   */
  getMostRecentPolls(number : number) : Observable<Poll[]> {
    // console.log("get most recent polls");
    return this.af.database
    // get all polls sorted by timestamp and limit the stream to the given number
    .list('/polls', {
        query: {
          orderByChild: 'timestamp',  
          limitToLast: number
        }
    })
    // firebase can only sort by ascending order, so we reverse the array here.
    .map(polls => polls.reverse()); 
  } 
  
  /**
   * Returns the polls created by the given user
   * 
   * Ideally we want to use the user's ID. However, this contains a colons,
   * which doesn't work together with the Angular router as of RC.1 :/ 
   * We just use the user name by now.
   */
  getByUserName(userName : string) : Observable<Poll[]> {
    // console.log("Finding polls created by user " + userName);
    return this.af.database.list('/polls', {
        query: {
          orderByChild: 'creatorName',         
          equalTo: userName
        }
    });
  }
  
  /**
   * Returns the poll with the given id
   */
  getById(id: string) : FirebaseObjectObservable<Poll> {
    // console.log("Retrieve poll by id " + id);
    let o =  this.af.object("/polls/" + id);
    return o;
  }
  
  /**
   * Deletes the poll with the given id
   */
  delete(id: string) {
    // console.log("Deleting poll with id " + id);
    this.allPolls.remove(id);
  }
  
  /**
   * Votes for a certain option of a poll. 
   * 
   * The implementation is not trivial: 2 users might vote in single poll at the same time.
   * Assume we have userA voting for option1 and userB voting for option2 in a poll where
   * no votes have been cast yet. If we just set the value, we might override the vote
   * of userA or userB depending on which change gets processed first. By using the 
   * transaction method on the firebase reference of the poll, we make sure that both votes
   * will be processed correctly by firebase.
   */  
  vote(poll: Poll, option: PollOption) {
      // console.log("voted for " + option + " in poll " + poll.question);
      let index = poll.options.indexOf(option);
      this.ref.child('polls').child(poll.id).child('options').transaction(function(currentValue) {
        let options: PollOption[] = currentValue;
        for (let singleOption of options) {
          if (singleOption.name !== option.name)
            continue;
          singleOption.value++;
          break;
        }
        
        return currentValue;
      });
  }

  /**
   * Stores a new poll in the database. 
   * 
   * After inserting the object into firebase, we instantly perform an update and set the poll's id
   * field to the unique key generated by firebase. This makes sure that all future queries have
   * the id field set. 
   */
  insertPoll(poll: Poll) {
    // console.log("we should persist poll " + JSON.stringify(poll));
    let promise = this.allPolls.push(poll);
    let key = promise.key();
    poll.id = key;
    this.getById(key).update({ id : key});
  }
}