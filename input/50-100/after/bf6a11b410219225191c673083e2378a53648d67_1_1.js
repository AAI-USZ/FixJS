function(err, server, stats) {
    assert.equal(null, err);
    assert.equal('1432', stats.bytes);
    assert.equal('5432', stats.count);
    assert.equal('myhostname:5544', server);
    callbn += 1;
  }