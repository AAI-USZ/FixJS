function(done) {

      compactDebug.addNamespace('global')
        .addJs('/large.js')
        .addJs('/a.js')
        .addJs('/b.js')
        .addJs('/c.js');

      var req
        , res = {
          locals: function(helper) {
            var c = helper.compactJs();
            c[0].should.match(/\-large.js$/);
            c[1].should.match(/\-a.js$/);
            c[2].should.match(/\-b.js$/);
            c[3].should.match(/\-c.js$/);
          }
        };

      compactDebug.middleware(['global'])(req, res, function() {
        done();
      });

    }