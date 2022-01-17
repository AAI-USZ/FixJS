function(done) {
        req.body.layout = 'row2';
        elements.update(req, db, 1, function(err, element) {
          element.layout.should.equal(req.body.layout);
          done();
        });
      }