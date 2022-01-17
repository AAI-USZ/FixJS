function(err, element) {
          element.type.should.equal(req.body.type);
          element.name.should.equal(req.body.name);
          should.not.exist(element.head);
          should.not.exist(element.nextId);
          element.required.should.equal(req.body.required);
          done();
        }