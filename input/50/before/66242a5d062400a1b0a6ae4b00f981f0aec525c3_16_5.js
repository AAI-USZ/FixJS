function(err, data) {
        if (err) {
          return done(err);
        }
        result = data;
        // HACK - required
        // so the state of this test
        // actually is in the next tick.
        setTimeout(function() {
          done();
        }, 0);
      }