function(done) {
        req.body.layout = 'row2';
        components.update(req, db, 1, function(err, component) {
          component.layout.should.equal(req.body.layout);
          done();
        });
      }