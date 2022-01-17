function (done) {

      compact.addNamespace('alternative', altPath);
      compact.ns.alternative.addJs('a.js');

      var app = {
        helpers: function (helper) {},
        configure: function(fn) {
          fn();
        }
      };

      compact.js(['alternative'])({ app : app }, {}, function () {

        var compacted = fs.readFileSync(destPath + '/alternative.js', 'utf8')
          , raw = fs.readFileSync(altPath + '/a.js', 'utf8');

        compacted.should.equal(raw);
        done();

      });

    }