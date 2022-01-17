function() {
    var output = renderHTML('provider', {
      name: 'yahoo'
    });

    assert.include(output, 'yahoo');
  }