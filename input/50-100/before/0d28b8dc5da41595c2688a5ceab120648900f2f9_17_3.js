function(done) {
      eventFired = null;
      subject.once('load', function(data) {
        eventFired = data;
      });

      // wipe out _accounts beforehand
      // so not to confuse add's caching
      // with alls
      subject._accounts = {};
      subject.load(function(err, data) {
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
      });
    }