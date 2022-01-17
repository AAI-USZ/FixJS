function(err, element) {
            element.type.should.equal(req.body.type);
            should.not.exist(element.head);
            should.not.exist(element.nextId);
            element.required.should.equal(req.body.required);
            element.src.should.equal(req.body.src);
            done();
          }