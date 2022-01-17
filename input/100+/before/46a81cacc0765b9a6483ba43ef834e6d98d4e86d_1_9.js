function (done) {

      var compactDebug = require('../../compact').createCompact({
        srcPath: srcPath,
        destPath: destPath,
        debug: true
      });


      compactDebug.addNamespace('global')
        .addJs('/a.js');

        compactDebug.addNamespace('alternative', altPath)
        .addJs('/a.js');

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

      compactDebug.js(['global', 'alternative'])(req, res, function() {});

    }