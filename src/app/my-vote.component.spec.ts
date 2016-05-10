import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { MyVoteAppComponent } from '../app/my-vote.component';

beforeEachProviders(() => [MyVoteAppComponent]);

describe('App: MyVote', () => {
  it('should create the app',
      inject([MyVoteAppComponent], (app: MyVoteAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'my-vote works!\'',
      inject([MyVoteAppComponent], (app: MyVoteAppComponent) => {
    expect(app.title).toEqual('my-vote works!');
  }));
});
