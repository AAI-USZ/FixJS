function (err, s) {
      assert.ifError(err);
      assert.equal(s.name, 'the included');

      S.find({ _id: s._id }).select('thin name').exec(function (err, s) {
        if (!--pending) {
          db.close();
          done();
        }
        s = s[0];
        assert.ifError(err);
        assert.strictEqual(true, s.isSelected('name'));
        assert.strictEqual(true, s.isSelected('thin'));
        assert.equal(s.name, 'the included');
        assert.ok(s.thin);
      });

      S.findById(s).select({'name':0}).exec(function (err, s) {
        if (!--pending) {
          db.close();
          done();
        }
        assert.strictEqual(null, err);
        assert.equal(false, s.isSelected('name'))
        assert.equal(true, s.isSelected('thin'))
        assert.strictEqual(undefined, s.name);
        assert.equal(true, s.thin);
      });
    }