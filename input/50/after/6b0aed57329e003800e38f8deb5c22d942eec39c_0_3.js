function(err, cleaned) {
    assert.deepEqual(err.message, 'String is not in range', 'len test (negative case 2)');
  }