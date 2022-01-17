function() {
  before(function(done) {
    var req = projectReq;
    projects.add(req, db, function(err, project) {
        req = screenReq;
        screens.add(req, db, done);
    });
  });

  after(function(done) {
    db.flushdb(done);
    console.log('cleared test components database');
  });

  describe('POST /projects/:project_id/screens/:screen_id/components',
    function() {
      it('adds a new component', function(done) {
        var req = componentReq;

        components.add(req, db, function(err, component) {
          component.type.should.equal(req.body.type);
          component.layout.should.eql(req.body.layout);
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
            component.layout.should.eql(req.body.layout);
            component.action.should.equal(req.body.action);
            done();
          });
        }, 10);
      });
    });

  describe('GET /projects/:project_id/screens/:screen_id/components',
    function() {
      it('returns a list of available components for the screen', function(done) {
        var req = componentReq;

        components.list(req, db, function(errList, componentList) {
          componentList[0].type.should.equal(req.body.type);
          componentList[0].layout.should.eql(req.body.layout);
          componentList[0].action.should.equal(req.body.action);

          req = otherComponentReq;
          componentList[1].type.should.equal(req.body.type);
          componentList[1].layout.should.eql(req.body.layout);
          componentList[1].action.should.equal(req.body.action);
          done();
        });
      });
    });

  describe('GET /projects/:project_id/screens/:screen_id/components/:id',
    function() {
      var req = componentReq;

      it('returns a specific component', function(done) {
        components.get(req, db, 1, function(err, component) {
          component.type.should.equal(req.body.type);
          component.layout.should.eql(req.body.layout);
          component.action.should.equal(req.body.action);
          done();
        });
      });

      it('returns no component', function(done) {
        components.get(req, db, 12345, function(err, component) {
          should.not.exist(component);
          done();
        });
      });
    });

  describe('PUT /projects/:project_id/screens/:screen_id/components/:id',
    function() {
      var req = componentReq;

      it('updates a component', function(done) {
        req.body.layout = {
          row: 2,
          col: 1,
        };
        components.update(req, db, 1, function(err, component) {
          component.layout.should.eql(req.body.layout);
          done();
        });
      });

      it('accepts an empty callback', function(done) {
        req.body.layout = {
          row: 2,
          col: 2
        };
        components.update(req, db, 1);

        // wait 10ms for db transaction to complete
        setTimeout(function() {
          components.get(req, db, 1, function(err, component) {
            component.layout.should.eql(req.body.layout);
            done();
          });
        }, 10);
      });
    });

  describe('DELETE /projects/:project_id/screens/:screen_id/components/:id',
    function() {
      var req = componentReq;

      it('attempts to delete a component', function(done) {
        components.remove(req, db, 1, function(err) {
          should.not.exist(err);
          done();
        });
      });

      it('accepts an empty callback', function(done) {
        components.remove(req, db, 2);

        // wait 10ms for db transaction to complete
        setTimeout(function() {
          components.list(req, db, function(error, componentList) {
            componentList.should.eql([]);
            done();
          });
        }, 10);
      });

      it('deletes an element associated with a component', function(done) {
        var req = componentReq;

        components.add(req, db, function(err, component) {
          req = elementReq;

          elements.add(req, db, function(err, element) {
            req = componentReq;

            components.remove(req, db, 3, function(err) {
              should.not.exist(err);
              elements.list(req, db, function(err, elementList) {
                elementList.should.eql([]);
                done();
              });
            });
          });
        });
      });
    });
}