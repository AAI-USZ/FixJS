function() {
    var output = renderHTML('accountItem', {
      name: 'yahoo'
    });

    assert.include(output, 'yahoo');
  }