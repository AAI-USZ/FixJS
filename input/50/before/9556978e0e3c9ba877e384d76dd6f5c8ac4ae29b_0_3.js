function(err, cleaned) {
    assert.deepEqual(err.message, 'String is too large', 'len test (negative case 2)');
  }