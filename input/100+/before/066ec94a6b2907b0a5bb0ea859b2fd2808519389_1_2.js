function (err) {
        if (err) return next(err);
        assert.equal(p.keywords.length,1);
        assert.equal(p.keywords[0],'heckmann');
        p.name.last = 'fuerstenau';
        p.save(function (err) {
          if (err) return next(err);
          assert.equal(p.keywords.length,1);
          assert.equal(p.keywords[0],'fuerstenau');
          next();
        });
      }