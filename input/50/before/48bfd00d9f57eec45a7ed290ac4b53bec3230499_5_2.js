function() {
      client.add(SET_KEY, val, function(res) {
        done(assert.equal(res, 0, 'Values do not match.'));
      });
    }