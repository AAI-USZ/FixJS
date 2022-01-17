function() {
    var columns = processor.getColumns();
    var expected = ['name', 'address', 'email_address', 'description'];
    assert.deepEqual(columns.sort(), expected.sort());
  }