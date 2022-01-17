function(err, component) {
        component.layout.should.equal(req.body.layout);
        done();
      }