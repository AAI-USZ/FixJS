function () {
    this.listener.then(function () {});
    var self = this;

    assert.throws(function () {
      self.listener();
    }, /^Error: Cannot be called after then$/);
  }