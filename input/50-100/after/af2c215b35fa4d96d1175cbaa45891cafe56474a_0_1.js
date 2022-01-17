function(done) {
    var opts = { endpoint: '' };
    setupMock(function(opts, callback) {
      assert.ok(typeof callback === 'function');
      assert.equal(opts.method, 'GET');
      done();
    });
    var op = seraph.operation('');
    seraph.call(op);
  }