function (err, d) {
      assert.ifError(err);

      M.findById(d)
      .select('+name')
      .exec(function (err, doc) {
        assert.ifError(err);
        assert.equal(false, doc.thin);
        assert.equal('1 meter', doc.name);
        assert.equal(d.id, doc.id);

        M.findById(d)
        .select('+name -thin')
        .exec(function (err, doc) {
          assert.ifError(err);
          assert.equal(undefined, doc.thin);
          assert.equal('1 meter', doc.name);
          assert.equal(d.id, doc.id);

          M.findById(d)
          .select('-thin +name')
          .exec(function (err, doc) {
            assert.ifError(err);
            assert.equal(undefined, doc.thin);
            assert.equal('1 meter', doc.name);
            assert.equal(d.id, doc.id);

            M.findById(d)
            .select('-thin')
            .exec(function (err, doc) {
              db.close();
              assert.ifError(err);
              assert.equal(undefined, doc.thin);
              assert.equal(undefined, doc.name);
              assert.equal(d.id, doc.id);
              done();
            });
          });
        });
      });
    }