function (done) {

      var content = 'var test = 1';
      fs.writeFileSync(srcPath + '/tmp.js', content);

      compactDebug.addNamespace('global')
        .addJs('/tmp.js')
        ;



      var
        results = [content, ''],
        i = 0,
        req = {
          app: {
            helpers: function(helper) {
              fs.readFileSync(destPath + helper.compactJs()[0]).toString().should.equal(results[i++]);
            },
            configure: function(fn) {
              fn();
            }

          }
        }
        , res;

      compactDebug.js(['global'])(req, res, function() {
        fs.unlinkSync(srcPath + '/tmp.js');
        compactDebug.js(['global'])(req, res, function() {
          done();
        });
      });
    }