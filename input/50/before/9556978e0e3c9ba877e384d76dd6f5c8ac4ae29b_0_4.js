function(err, cleaned) {
    assert.deepEqual(err.message, 'String is too small', 'notContains test (negative case)');
  }