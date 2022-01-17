function(err, success) {
      assert.ok(!err, 'should not have an error when deleting db');
      assert.ok(success, 'should be able to delete the db');
      done();
    }