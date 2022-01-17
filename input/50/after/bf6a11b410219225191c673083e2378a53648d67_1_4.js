function(err, val) {
    assert.equal(undefined, val);
    assert.equal("MemJS SET: " + errors[3], err.message);
    callbn += 1;
  }