import { MyVotePage } from './app.po';

describe('my-vote App', function() {
  let page: MyVotePage;

  beforeEach(() => {
    page = new MyVotePage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('my-vote works!');
  });
});
