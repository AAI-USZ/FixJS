function (err, s) {
      assert.ifError(err);
      assert.equal(s.name, 'the included');
      assert.equal(s.docs[0].name, 'test');

      S.find({ _id: s._id }).select('thin name docs.bool docs.name').exec(function (err, s) {
        if (!--pending) {
          db.close();
          done();
        }
        s = s[0];
        assert.ifError(err);
        assert.strictEqual(true, s.isSelected('name'));
        assert.strictEqual(true, s.isSelected('thin'));
        assert.strictEqual(true, s.isSelected('docs.name'));
        assert.strictEqual(true, s.isSelected('docs.bool'));
        assert.equal(s.name, 'the included');
        assert.equal(s.docs[0].name, 'test');
        assert.ok(s.thin);
        assert.ok(s.docs[0].bool);
      });

      S.findById(s).select('-name -docs.name').exec(function (err, s) {
        if (!--pending) {
          db.close();
          done();
        }
        assert.strictEqual(null, err);
        assert.equal(false, s.isSelected('name'))
        assert.equal(true, s.isSelected('thin'))
        assert.equal(false, s.isSelected('docs.name'))
        assert.equal(true, s.isSelected('docs.bool'))
        assert.strictEqual(undefined, s.name);
        assert.strictEqual(undefined, s.docs[0].name);
        assert.equal(true, s.thin);
        assert.equal(true, s.docs[0].bool);
      });
    }