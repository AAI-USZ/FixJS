function(done) {
    var opts = { endpoint: '' };
    var obj = {};
    setupMock(function(opts, callback) {
      assert.equal(opts.uri, '/db/data/');
      done();
    });
    var op = seraph.operation(opts, '', obj);
    seraph.call(opts, op);
  }