function(done) {
    client.sadd(SET_KEY, Date.now(), function() {
      client.smembers(SET_KEY, function(members) {
        var nonString = members.some(function(member) {
          return typeof member !== 'string';
        });

        done(assert.equal(nonString, false, 'There is a non-string member.'));
      });
    });
  }