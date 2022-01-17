function (done) {

      var compactDebug = require('../../compact').createCompact({
        srcPath: altPath,
        destPath: destPath,
        debug: true
      });


      compactDebug.addNamespace('global')
        .addJs('/a.js')
        .addJs('/x/a.js');

      var
        req = {
          app: {
            helpers: function(helper) {
              helper.compactJs()[0].should.not.equal(helper.compactJs()[1]);
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