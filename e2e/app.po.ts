export class MyVotePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('my-vote-app h1')).getText();
  }
}
