function(done) {
    db = testSupport.calendar.db();
    subject = db.getStore('Account');

    db.open(function(err) {
      assert.ok(!err);
      done();
    });
  }