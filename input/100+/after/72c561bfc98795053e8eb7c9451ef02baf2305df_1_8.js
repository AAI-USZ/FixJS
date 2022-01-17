function (done) {

      compact.addNamespace('alternative', altPath);
      compact.ns.alternative.addJs('a.js');

      var req
        , res = {
          locals: function (helper) {}
        };

      compact.middleware(['alternative'])(req, res, function () {

        var compacted = fs.readFileSync(destPath + '/alternative.js', 'utf8')
          , raw = fs.readFileSync(altPath + '/a.js', 'utf8');

        compacted.should.equal(raw);
        done();

      });

    }