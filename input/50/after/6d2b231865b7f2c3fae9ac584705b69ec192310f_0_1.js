function() {
    var columns = processor.getColumns();
    var expected = ['name', 'address', 'email_address', 'description',
                    'age', 'product'];
    assert.deepEqual(columns.sort(), expected.sort());
  }