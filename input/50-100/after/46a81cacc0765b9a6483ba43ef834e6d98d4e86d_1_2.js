function() {
        profileRes.locals = function(helper) {
          helper.compactJs().should.eql(['/profile.js']);
          doneCount += 1;
          if (doneCount === 2) {
            done();
          }
        };
        compact.middleware(['profile'])(req, profileRes, function() {});
      }