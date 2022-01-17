function(err, element) {
            element.type.should.equal(req.body.type);
            element.head.should.equal(req.body.head);
            element.nextId.should.equal(req.body.nextId);
            element.text.should.equal(req.body.text);
            element.level.should.equal(req.body.level);
            done();
          }