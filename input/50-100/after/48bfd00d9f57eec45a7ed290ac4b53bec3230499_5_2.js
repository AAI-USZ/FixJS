function(done) {
    client.smembers(SET_KEY, function(members) {
      done(assert.equal(Array.isArray(members), true, 'Members is not an array.'));
    });
  }