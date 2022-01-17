function(error, puppy){
        setTimeout(function(){ currentResponse = bodyResponses.unicornication; }, 150);
        setTimeout(function(){
          callsCount.should.equal(0);
          done();
        }, 350);
        
        puppy.on('change', '#unicorns', function(){
          callsCount++;
          puppy.off('change', '#unicorns');
          currentResponse = bodyResponses.base;
        });
      }