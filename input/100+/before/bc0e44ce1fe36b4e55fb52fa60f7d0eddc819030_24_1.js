function(done) {
        // make sure db is open
        subject.open(function() {
          done();
        });
      }