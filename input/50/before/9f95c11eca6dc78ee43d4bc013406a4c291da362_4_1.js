function(_err, _db) {
    test.equal(true, openCalled);

    // Close and cleanup
    db.close();
    test.done();
  }