function(err, result) {
        assert.ok(!err);
        assert.deepEqual([{x: user, n: null}], result);
        done();
      }