function(err, val, flags) {
    assert.equal('world', val);
    assert.equal('flagshere', flags);
    assert.equal(null, err);
    callbn += 1;
  }