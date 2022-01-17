function(done) {
    db = testSupport.calendar.db();
    subject = new Calendar.Store.Abstract(db);

    // set _store to accounts so we can actually
    // persist stuff.
    subject._store = 'accounts';

    subject._createModel = function(object, id) {
      object._id = id;
      return object;
    };

    db.open(function(err) {
      assert.ok(!err);
      done();
    });
  }