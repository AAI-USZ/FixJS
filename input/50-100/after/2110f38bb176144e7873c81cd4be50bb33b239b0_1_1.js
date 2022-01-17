function() {
    var pos, test;
    pos = this.clickPosition();
    test = this.clickTest(pos.x, pos.y);
    if (test.status === 'success') {
      return this.page.sendEvent('click', pos.x, pos.y);
    } else {
      throw new Poltergeist.ClickFailed(test.selector, pos);
    }
  }