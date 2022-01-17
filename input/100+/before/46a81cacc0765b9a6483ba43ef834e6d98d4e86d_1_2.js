function(done) {

      compactDebug.addNamespace('global')
        .addJs('/a.js')
        .addJs('/b.js');

       var
        req = {
          app: {
            helpers: function(helper) {
              helper.compactJs()[0].should.match(/\-a.js$/);
              helper.compactJs()[1].should.match(/\-b.js$/);
              done();
            },
            configure: function(fn) {
              fn();
            }
          }
        }
        , res;

      compactDebug.js(['global'])(req, res, function() {});
    }