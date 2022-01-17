function(done) {
    var opts = { endpoint: '' };
    var testObject = {
      foo: 'foo',
      bar: 10
    };
    setupMock(function(opts, callback) {
      assert.ok(typeof callback === 'function');
      assert.equal(opts.method, 'POST');
      assert.deepEqual(opts.json, testObject);
      done();
    });
    var op = seraph.operation(opts, '', testObject);
    seraph.call(opts, op);
  }