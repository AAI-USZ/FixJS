function(done) {
    
    var getter = function(key, cb) {
      var blockingMock = [0, 1, 2, 3, 4];
      setTimeout(function() {
        cb(null, blockingMock[key]); 
      }, 5);
    };
    
    cache.invalidate();
    
    for(var i = 0; i < 5 ; i++) {
      (function(i) {
        setTimeout(function() {
          cache.get(i, { getter: getter }, function(err, val) {
            should.equal(val, i);
            if(i == 4) {
              done();
            }
          });
        }, i);
      })(i);
    }
    
  }