function(err, screen) {
        screen.title.should.equal(req.body.title);
        screen.isStart.should.equal(req.body.isStart);
        screen.layout.should.equal(req.body.layout);
        done();
      }