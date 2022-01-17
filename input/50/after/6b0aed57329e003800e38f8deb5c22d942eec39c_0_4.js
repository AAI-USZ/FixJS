function(err, cleaned) {
    assert.deepEqual(err.message, 'String is not in range', 'notContains test (negative case)');
  }