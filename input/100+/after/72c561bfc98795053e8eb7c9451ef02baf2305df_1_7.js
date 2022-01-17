function(done) {

      compact.addNamespace('global')
        .addJs('/a.js')
        .addJs('/b.js')
        .addJs('/c.js');

      compact.addNamespace('profile')
        .addJs('/b.js');

      var doneCount = 0
        , req
        , globalRes = {}
        , profileRes = {};

        globalRes.locals = function(helper) {
          helper.compactJs().should.eql(['/global.js']);
          doneCount += 1;
          if (doneCount === 2) {
            done();
          }
        };

      compact.middleware(['global'])(req, globalRes, function() {
        profileRes.locals = function(helper) {
          helper.compactJs().should.eql(['/profile.js']);
          doneCount += 1;
          if (doneCount === 2) {
            done();
          }
        };
        compact.middleware(['profile'])(req, profileRes, function() {});
      });


    }