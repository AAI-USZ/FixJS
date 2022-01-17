function(done) {

      var compactDebug = require('../../compact').createCompact({ srcPath: srcPath, destPath: destPath, debug: true });


      compactDebug.addNamespace('global')
        .addJs('/a.js')
        .addJs('/b.js');

        compactDebug.addNamespace('profile')
        .addJs('/c.js');

      var
        req = {
          app: {
            helpers: function(helper) {
              var c = helper.compactJs();
              c[0].should.match(/\-a.js$/);
              c[1].should.match(/\-b.js$/);
              c[2].should.match(/\-c.js$/);
              done();
            },
            configure: function(fn) {
              fn();
            }
          }
        }
        , res;

      compactDebug.js(['global', 'profile'])(req, res, function() {});
    }