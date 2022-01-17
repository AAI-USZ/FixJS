function(done) {
    return function(truthy) {
      done(assert.ok(truthy, 'Not the case'));
    };
  }