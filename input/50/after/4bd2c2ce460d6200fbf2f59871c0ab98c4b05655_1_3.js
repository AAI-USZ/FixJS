function(err) {
        if (err) {
          return done(err);
        }
        return ++finished;
      }