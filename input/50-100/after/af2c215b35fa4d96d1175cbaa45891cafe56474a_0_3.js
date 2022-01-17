function(done) {
    var opts = { endpoint: '' };
    var obj = {};
    setupMock(function(opts, callback) {
      assert.equal(opts.uri, testDatabase + '/db/data/');
      done();
    });
    var op = seraph.operation('', obj);
    seraph.call(op);
  }