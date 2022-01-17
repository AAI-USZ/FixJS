function(done){
      //used to assert the getter got called
      var called = false;
      
      var getter = function(key, cb) {
        var blockingMock = {
          hello : "world",
          France: "Paris",
          Germany: "Berlin",
          UK: "London"
        };
        called = true;
        cb(null, blockingMock[key]);
      };
      
      cache.invalidate();
      
      cache.get("hello", { getter: getter},
                function(err, val) {
                  should.equal(val, "world");
                  //assert cache hit
                  true.should.equal(called);
                });
      
      setTimeout(function() {
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
        
        
        cache.get("hello", { getter: getter },
                  function(err, val) {
                    should.equal(val, "world");
                    //assert cache hit
                    true.should.equal(called);
                    called = false;
                    done();
                  });
      }, 4);
      
    }