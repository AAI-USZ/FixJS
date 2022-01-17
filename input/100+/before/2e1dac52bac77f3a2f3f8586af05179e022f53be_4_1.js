function(errList, elementList) {
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
        }