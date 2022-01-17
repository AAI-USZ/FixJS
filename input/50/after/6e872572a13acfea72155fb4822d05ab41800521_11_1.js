function(done) {
        elements.get(req, db, 12345, function(err, element) {
          should.not.exist(element);
          done();
        });
      }