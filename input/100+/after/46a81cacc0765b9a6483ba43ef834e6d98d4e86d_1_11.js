function (done) {

      var content = 'var test = 1';
      fs.writeFileSync(srcPath + '/tmp.js', content);

      compactDebug.addNamespace('global')
        .addJs('/tmp.js')
        ;



      var results = [content, '']
        , i = 0
        , req
        , res = {
          locals: function(helper) {
            fs.readFileSync(destPath + helper.compactJs()[0]).toString().should.equal(results[i++]);
          }
        };

      compactDebug.middleware(['global'])(req, res, function() {
        fs.unlinkSync(srcPath + '/tmp.js');
        compactDebug.middleware(['global'])(req, res, function() {
          done();
        });
      });
    }