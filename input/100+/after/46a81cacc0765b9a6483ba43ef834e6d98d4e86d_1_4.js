function(done) {

      compact.addNamespace('global')
        .addJs('/a.js')
        .addJs('/b.js');

        compact.addNamespace('profile')
        .addJs('/c.js');

      var req
        , res = {
          locals: function(helper) {
            helper.compactJs().should.eql(['/global-profile.js']);
            done();
          }
        };

      compact.middleware(['global', 'profile'])(req, res, function() {});
    }