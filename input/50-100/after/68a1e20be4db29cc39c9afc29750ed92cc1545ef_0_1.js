function () {
    var spy = sinon.spy();

    this.listener.err('a');
    this.listener.err('b');
    this.listener.then(spy);

    sinon.assert.calledWithMatch(spy, {
      errors : ['a', 'b']
    });
  }