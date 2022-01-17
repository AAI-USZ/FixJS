function cb (err, s) {
        if (!--pending) {
          db.close();
          done();
        }
        if (Array.isArray(s)) s = s[0];
        assert.strictEqual(null, err);
        assert.strictEqual(true, s.isSelected('name'));
        assert.equal(s.name, 'the included');
      }