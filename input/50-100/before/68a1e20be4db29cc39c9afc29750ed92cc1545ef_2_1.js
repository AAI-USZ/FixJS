function () {
    this.listener.then(function () {});
    var self = this;

    assert.throws(function () {
      self.listener.push(1);
    }, /^Error: Cannot be called after then$/);
  }