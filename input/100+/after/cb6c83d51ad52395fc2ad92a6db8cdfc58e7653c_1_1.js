function(){
      describe('when the promise is fulfilled with no value', function(){
        var fulfilledPromise = {
          then: function (fulfilled, rejected) {
            process.nextTick(fulfilled);
          }
        };

        it('should invoke the callback', function(done){
          var test = new Runnable('foo', function(){
            return fulfilledPromise;
          });

          test.run(done);
        })
      })

      describe('when the promise is fulfilled with a value', function(){
        var fulfilledPromise = {
          then: function (fulfilled, rejected) {
            process.nextTick(function () {
              fulfilled({});
            });
          }
        };

        it('should invoke the callback', function(done){
          var test = new Runnable('foo', function(){
            return fulfilledPromise;
          });

          test.run(done);
        })
      })

      describe('when the promise is rejected', function(){
        var expectedErr = new Error('fail');
        var rejectedPromise = {
          then: function (fulfilled, rejected) {
            process.nextTick(function () {
              rejected(expectedErr);
            });
          }
        };

        it('should invoke the callback', function(done){
          var test = new Runnable('foo', function(){
            return rejectedPromise;
          });

          test.run(function(err){
            err.should.equal(expectedErr);
            done();
          });
        })
      })
    }