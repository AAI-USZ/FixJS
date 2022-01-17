function(done) {

      compact.addNamespace('global')
        .addJs('/a.js')
        .addJs('/b.js')
        .addJs('/c.js');

      compact.addNamespace('profile')
        .addJs('/b.js');

      var
        doneCount = 0,
        app = {
          helpers: null,
          configure: function(fn) {
            fn();
          }
        },
        res,
        globalReq = { app: app },
        profileReq = { app: app };

        globalReq.app.helpers = function(helper) {
          helper.compactJs().should.eql(['/global.js']);
          doneCount += 1;
          if (doneCount === 2) {
            done();
          }
        };

      compact.js(['global'])(globalReq, res, function() {
        profileReq.app.helpers = function(helper) {
          helper.compactJs().should.eql(['/profile.js']);
          doneCount += 1;
          if (doneCount === 2) {
            done();
          }
        };
        compact.js(['profile'])(profileReq, res, function() {});
      });


    }