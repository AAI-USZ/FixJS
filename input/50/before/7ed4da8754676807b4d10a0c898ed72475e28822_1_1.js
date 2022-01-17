function(err, result) {
        assert.ok(!err);
        assert.deepEqual([ user ], result);
        done();
      }