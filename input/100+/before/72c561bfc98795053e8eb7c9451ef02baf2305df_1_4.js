function(done) {

      compact.addNamespace('global')
        .addJs('/a.js')
        .addJs('/b.js');

        compact.addNamespace('profile')
        .addJs('/c.js');

      var
        req = {
          app: {
            helpers: function(helper) {
              helper.compactJs().should.eql(['/global-profile.js']);
              done();
            },
            configure: function(fn) {
              fn();
            }
          }
        }
        , res;

      compact.js(['global', 'profile'])(req, res, function() {});
    }