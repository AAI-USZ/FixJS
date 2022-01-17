function() {
    zlib.gunzip(input, function(err, buffer) {
      // zlib.gunzip should pass the error to the callback.
      assert.ok(err);
    });
  }