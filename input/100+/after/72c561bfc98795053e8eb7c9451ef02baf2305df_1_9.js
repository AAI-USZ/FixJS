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

      var req
        , res = {
          locals: function(helper) {
            helper.compactJs()[0].should.not.equal(helper.compactJs()[1]);
            done();
          }
        };

      compactDebug.middleware(['global', 'alternative'])(req, res, function() {});

    }