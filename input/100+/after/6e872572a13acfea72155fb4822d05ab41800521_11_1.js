function() {
      it('adds a new element', function(done) {
        var req = elementReq;
        elements.add(req, db, function(err, element) {
          element.type.should.equal(req.body.type);
          element.layout.should.equal(req.body.layout);
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
            element.layout.should.equal(req.body.layout);
            element.required.should.equal(req.body.required);
            element.src.should.equal(req.body.src);
            done();
          });
        }, 10);
      });
    }