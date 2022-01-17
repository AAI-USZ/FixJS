function(_err, _db) {
    test.equal(true, openCalled);

    // Close and cleanup
    _db.close();
    test.done();
  }