function () {
    var spy = sinon.spy();

    this.listener.err('a');
    this.listener.err('b');
    this.listener.then(spy);

    assert.deepEqual(spy.firstCall.args[0].errors, ['a', 'b']);
  }