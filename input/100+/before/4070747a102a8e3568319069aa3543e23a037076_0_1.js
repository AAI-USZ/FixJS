function(){
    it('should be thrown when there are no listeners', function(done){
      var old = process._events.uncaughtException;

      // sidestep mochas listener
      process._events.uncaughtException = function (err) {
        assert.ok(err);
        process._events.uncaughtException = old;
        done()
      }

      var db= start({ uri: 'mongodb://whatever23939.localhost/noooope', noErrorListener: 1 });
    })
  }