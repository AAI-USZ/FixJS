function(done) {
        components.get(req, db, 12345, function(err, component) {
          should.not.exist(component);
          done();
        });
      }