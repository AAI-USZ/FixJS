function() {
    it('returns a list of screens', function(done) {
      var req = screenReq;

      screens.list(req, db, function(errList, screenList) {
        screenList[0].title.should.equal(req.body.title);
        screenList[0].isStart.should.equal(req.body.isStart);
        screenList[0].layout.should.equal(req.body.layout);

        req = otherScreenReq;
        screenList[1].title.should.equal(req.body.title);
        screenList[1].isStart.should.equal(req.body.isStart);
        screenList[1].layout.should.equal(req.body.layout);
        done();
      });
    });
  }