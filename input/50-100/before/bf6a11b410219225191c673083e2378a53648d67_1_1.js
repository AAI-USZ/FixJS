function(server, stats) {
    assert.equal('1432', stats.bytes);
    assert.equal('5432', stats.count);
    assert.equal('myhostname:5544', server);
    callbn += 1;
  }