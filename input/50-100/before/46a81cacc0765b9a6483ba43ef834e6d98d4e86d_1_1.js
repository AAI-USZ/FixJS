function(done) {
      compact.addNamespace('global')
      .addJs('/a.js')
      .addJs('/b.js');

      var
        req = {
          app: {
            helpers: function(helper) {
              helper.compactJs().should.eql(['/global.js']);
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