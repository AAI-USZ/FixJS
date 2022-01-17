function(done) {
      compact.addNamespace('global');
      compact.js(['global']).should.be.a('function');

       var
        req = {
          app: {
            helpers: function(helper) {
              helper.compactJs()[0].should.match(/\/global.js$/);
              done();
            },
            configure: function(fn) {
              fn();
            }
          }
        }
        , res;

      compact.js(['global'])(req, res, function() {});

    }