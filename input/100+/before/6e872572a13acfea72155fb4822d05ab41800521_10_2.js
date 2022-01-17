function() {
    it('adds a new component', function(done) {
      var req = componentReq;

      components.add(req, db, function(err, component) {
        component.type.should.equal(req.body.type);
        component.layout.should.equal(req.body.layout);
        component.action.should.equal(req.body.action);
        done();
      });
    });

    it('accepts an empty callback', function(done) {
      var req = otherComponentReq;
      components.add(req, db);

      // wait 10ms for db transaction to complete
      setTimeout(function() {
        components.get(req, db, 2, function(err, component) {
          component.type.should.equal(req.body.type);
          component.layout.should.equal(req.body.layout);
          component.action.should.equal(req.body.action);
          done();
        });
      }, 10);
    });
  }