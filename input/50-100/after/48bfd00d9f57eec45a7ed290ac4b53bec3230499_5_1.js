function(done) {
    var val = 'foo:' + Date.now().toString();

    client.sadd(SET_KEY, val, function(res) {
      done(assert.equal(res, 'OK', 'Values do not match.'));
    });
  }