function() {
    it('returns a list of available screens for the project', function(done) {
      var req = screenReq;

      screens.list(req, db, function(errList, screenList) {
        screenList[0].title.should.equal(req.body.title);
        screenList[0].is_start.should.equal(req.body.is_start);
        screenList[0].layout.should.equal(req.body.layout);

        req = otherScreenReq;
        screenList[1].title.should.equal(req.body.title);
        screenList[1].is_start.should.equal(req.body.is_start);
        screenList[1].layout.should.equal(req.body.layout);
        done();
      });
    });
  }