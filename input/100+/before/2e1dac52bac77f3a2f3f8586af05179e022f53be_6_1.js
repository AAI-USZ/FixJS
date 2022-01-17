function() {
    it('adds a new screen', function(done) {
      var req = screenReq;
      screens.add(req, db, function(err, screen) {
        screen.title.should.equal(req.body.title);
        screen.is_start.should.equal(req.body.is_start);
        screen.layout.should.equal(req.body.layout);
        done();
      });
    });

    it('accepts an empty callback', function(done) {
      var req = otherScreenReq;
      screens.add(req, db);

      // wait 10ms for db transaction to complete
      setTimeout(function() {
        screens.get(req, db, 2, function(err, screen) {
          screen.title.should.equal(req.body.title);
          screen.is_start.should.equal(req.body.is_start);
          screen.layout.should.equal(req.body.layout);
          done();
        });
      }, 10);
    });
  }