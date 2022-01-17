function(err, element) {
        element.layout.should.equal(req.body.layout);
        done();
      }