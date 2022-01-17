function(done) {
      compact.addNamespace('global');
      compact.middleware(['global']).should.be.a('function');

       var req
        , res = {
            locals: function(helper) {
              helper.compactJs()[0].should.match(/\/global.js$/);
              done();
            }
          };

      compact.middleware(['global'])(req, res, function() {});

    }