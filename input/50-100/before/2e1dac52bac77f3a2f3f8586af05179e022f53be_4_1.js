function(err, element) {
          element.type.should.equal(req.body.type);
          element.head.should.equal(req.body.head);
          element.nextId.should.equal(req.body.nextId);
          element.required.should.equal(req.body.required);
          element.src.should.equal(req.body.src);
          done();
        }