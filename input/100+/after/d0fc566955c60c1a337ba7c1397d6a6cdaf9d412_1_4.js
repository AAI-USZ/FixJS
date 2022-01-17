function(done) {
    
    var getter = function(key, cb) {
      var blockingMock = {"hello": "world"};
      setTimeout(function() {
        cb(null, blockingMock[key]); 
      }, 5);
    };
    
    cache.invalidate();
    
    cache.get("hello", { getter: getter }, function(err, val) {
      should.equal(val, "world");
      done();
    });
    
    cache.invalidate("hello");
    
  }