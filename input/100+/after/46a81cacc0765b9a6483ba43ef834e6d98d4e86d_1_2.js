function(done) {

      compactDebug.addNamespace('global')
        .addJs('/a.js')
        .addJs('/b.js');

      var req
        , res = {
            locals: function(helper) {
              helper.compactJs()[0].should.match(/\-a.js$/);
              helper.compactJs()[1].should.match(/\-b.js$/);
              done();
            }
          };

      compactDebug.middleware(['global'])(req, res, function() {});
    }