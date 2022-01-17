function () {
    this.listener.then(function () {});
    var error;

    try {
      this.listener.err();
    } catch (e) {
      error = e;
    }

    assert.equal("Error", error.name);
    assert.equal("Cannot be called after then", error.message);
  }