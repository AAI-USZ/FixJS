function(test) {
    var success = (test.result === !test.todo);
    if (success && ++this.collapsedMessages < this.MAX_COLLAPSED_MESSAGES) {
      return;
    }
    this._logCollapsedMessages();
    this._log(test);
  }