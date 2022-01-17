function() {
      test.equal(true, closedCalled);

      // Attempt to connect again
      client.open(function(err, result) {
        test.equal(null, err)
        test.equal(true, openCalled);
        test.done();
      })
    }