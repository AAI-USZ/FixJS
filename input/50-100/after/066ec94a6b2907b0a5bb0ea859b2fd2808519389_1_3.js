function (next) {
      var p = new Person({ name: { last: 'heckmann' }});
      assert.equal(p._keywords.length,0);
      p.save(function (err) {
        if (err) return next(err);
        assert.equal(p._keywords.length,1);
        assert.equal(p._keywords[0],'heckmann');
        next();
      });
    }