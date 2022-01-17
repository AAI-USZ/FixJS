function(){
          catsCallsCount.should.equal(1);
          unicornsCallsCount.should.equal(1);
          generalCallsCount.should.equal(2);
          currentResponse = bodyResponses.base; 
          done();
        }