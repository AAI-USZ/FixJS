function(done) {
    client.scard(SET_KEY, function(cnt) {
      done(assert.equal(cnt, ADDS_COUNT, 'Count is not correct.'));
    });
  }