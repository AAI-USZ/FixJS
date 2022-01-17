function() {
        cache.get("France", { getter: getter},
                  function(err, val) {
                    should.equal(val, "Paris");
                    //assert cache hit
                    true.should.equal(called);
                    called = false;
                  });
        
        cache.get("Germany", { getter: getter},
                  function(err, val) {
                    should.equal(val, "Berlin");
                    //assert cache hit
                    true.should.equal(called);
                    called = false;
                  });
        
        cache.get("UK", { getter: getter},
                  function(err, val) {
                    should.equal(val, "London");
                    //assert cache hit
                    true.should.equal(called);
                    called = false;
                  });
        
        
        cache.get("Switzerland", { getter: getter },
                  function(err, val) {
                    should.equal(val, "Geneva");
                    //assert cache hit
                    true.should.equal(called);
                    called = false;
                    done();
                  });
      }