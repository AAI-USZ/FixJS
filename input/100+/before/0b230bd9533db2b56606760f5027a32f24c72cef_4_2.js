function() {
  before(function(done) {
    var req = projectReq;

    projects.add(req, db, function(err, project) {
      req = screenReq;
      screens.add(req, db, function(errScreen, screen) {
        req = componentReq;
        components.add(req, db, done);
      });
    });
  });

  after(function(done) {
    db.flushdb(done);
    console.log('cleared test elements database');
  });

  describe('POST /projects/:project_id/screens/:screen_id/components/:component_id/elements',
    function() {
      it('adds a new element', function(done) {
        var req = elementReq;
        elements.add(req, db, function(err, element) {
          element.type.should.equal(req.body.type);
          element.head.should.equal(req.body.head);
          element.nextId.should.equal(req.body.nextId);
          element.required.should.equal(req.body.required);
          element.src.should.equal(req.body.src);
          done();
        });
      });

      it('accepts an empty callback', function(done) {
        var req = otherElementReq;
        elements.add(req, db);

        // wait 10ms for db transaction to complete
        setTimeout(function() {
          elements.get(req, db, 2, function(err, element) {
            element.type.should.equal(req.body.type);
            should.not.exist(element.head);
            should.not.exist(element.nextId);
            element.required.should.equal(req.body.required);
            element.src.should.equal(req.body.src);
            done();
          });
        }, 10);
      });
    });

  describe('GET /projects/:project_id/screens/:screen_id/components/:component_id/elements',
    function() {
      it('returns a list of available elements for the component', function(done) {
        var req = elementReq;

        elements.list(req, db, function(errList, elementList) {
          elementList[0].type.should.equal(req.body.type);
          elementList[0].head.should.equal(req.body.head);
          elementList[0].nextId.should.equal(req.body.nextId);
          elementList[0].required.should.equal(req.body.required);
          elementList[0].src.should.equal(req.body.src);

          req = otherElementReq;
          elementList[1].type.should.equal(req.body.type);
          should.not.exist(elementList[1].head);
          should.not.exist(elementList[1].nextId);
          elementList[1].required.should.equal(req.body.required);
          elementList[1].src.should.equal(req.body.src);
          done();
        });
      });
    });

  describe('GET /projects/:project_id/screens/:screen_id/components/:component_id/elements/:id',
    function() {
      var req = elementReq;

      it('returns a specific element', function(done) {
        elements.get(req, db, 1, function(err, element) {
          element.type.should.equal(req.body.type);
          element.head.should.equal(req.body.head);
          element.nextId.should.equal(req.body.nextId);
          element.required.should.equal(req.body.required);
          element.src.should.equal(req.body.src);
          done();
        });
      });

      it('returns no element', function(done) {
        elements.get(req, db, 12345, function(err, element) {
          should.not.exist(element);
          done();
        });
      });
    });

  describe('PUT /projects/:project_id/screens/:screen_id/components/:component_id/elements/:id',
    function() {
      var req = elementReq;

      it('updates a specific element', function(done) {
        req.body.nextId = 2;
        elements.update(req, db, 1, function(err, element) {
          element.nextId.should.equal(req.body.nextId);
          done();
        });
      });

      it('accepts an empty callback', function(done) {
        req.body.nextId = 3;
        elements.update(req, db, 1);

        // wait 10ms for db transaction to complete
        setTimeout(function() {
          elements.get(req, db, 1, function(err, element) {
            element.nextId.should.equal(req.body.nextId);
            done();
          });
        }, 10);
      });
    });

  describe('DELETE /projects/:project_id/screens/:screen_id/components/:component_id/elements/:id',
    function() {
      var req = elementReq;

      it('deletes an element', function(done) {
        elements.remove(req, db, 1, function(err) {
          should.not.exist(err);
          done();
        });
      });

      it('accepts an empty callback', function(done) {
        elements.remove(req, db, 2);

        // wait 10ms for db transaction to complete
        setTimeout(function() {
          elements.list(req, db, function(error, elementList) {
            elementList.should.eql([]);
            done();
          });
        }, 10);
      });
    });
}