function(done) {
    var val = 'exists';

    client.sadd(SET_KEY, val, function() {
      client.add(SET_KEY, val, function(res) {
        done(assert.equal(res, 0, 'Values do not match.'));
      });
    });
  }