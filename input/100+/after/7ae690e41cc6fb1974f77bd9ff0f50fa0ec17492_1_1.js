function(done) {
      var req = calipsoHelper.requests.anonUser,
          res = calipsoHelper.response,
          response = 0,
          routeFn = calipso.routingFn();

      req.cookies = {};
      req.url = '/secured';
      res.outputStack = [];

      routeFn(req, res, function(err) {
        res.outputStack.should.eql(['module_first','module_last']);
        req.flashMsgs[0].type.should.equal('error');
        res.redirectQueue.length.should.equal(1);
        res.redirectQueue[0].should.equal('/');
        response.should.equal(0); // Don't match
        done();
      })

    }