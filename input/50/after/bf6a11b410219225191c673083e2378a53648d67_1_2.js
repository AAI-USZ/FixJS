function(err, val) {
    assert.equal(true, val);
    assert.equal(null, err);
    callbn += 1;
  }