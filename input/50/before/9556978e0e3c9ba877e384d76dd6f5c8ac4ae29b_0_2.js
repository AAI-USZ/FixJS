function(err, cleaned) {
    assert.deepEqual(err.message, 'String is too small', 'len test (negative case)');
  }