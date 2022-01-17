function(){
          catsCallsCount.should.equal(1);
          unicornsCallsCount.should.equal(1);
          generalCallsCount.should.equal(2);
          puppy.off('change');
          currentResponse = bodyResponses.base; 
          done();
        }