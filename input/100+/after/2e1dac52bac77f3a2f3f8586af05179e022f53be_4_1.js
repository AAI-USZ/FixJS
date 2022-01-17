function(errList, elementList) {
          elementList[0].type.should.equal(req.body.type);
          elementList[0].name.should.equal(req.body.name);
          should.not.exist(elementList[0].head);
          should.not.exist(elementList[0].nextId);
          elementList[0].required.should.equal(req.body.required);

          req = otherElementReq;
          elementList[1].type.should.equal(req.body.type);
          elementList[1].head.should.equal(req.body.head);
          elementList[1].nextId.should.equal(req.body.nextId);
          elementList[1].text.should.equal(req.body.text);
          elementList[1].level.should.equal(req.body.level);
          done();
        }