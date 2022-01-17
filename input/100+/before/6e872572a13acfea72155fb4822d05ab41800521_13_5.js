function() {
    var req = screenReq;

    it('deletes a screen', function(done) {
      screens.remove(req, db, 1, function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('accepts an empty callback', function(done) {
      screens.remove(req, db, 2);

      // wait 10ms for db transaction to complete
      setTimeout(function() {
        screens.list(req, db, function(err, screenList) {
          screenList.should.eql([]);
          done();
        });
      }, 10);
    });

    it('deletes a component associated with a screen', function(done) {
      var req = screenReq;

      screens.add(req, db, function(err, screen) {
        req = componentReq;

        components.add(req, db, function(err, component) {
          req = screenReq;

          screens.remove(req, db, 1, function(err) {
            should.not.exist(err);
            components.list(req, db, function(err, componentList) {
              componentList.should.eql([]);
              done();
            });
          });
        });
      });
    });
  }