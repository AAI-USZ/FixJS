function () {
    var db = start()
      , M = db.model(modelname, collection + random())
      , _id = new DocumentObjectId
      , pending = 2

    M.findByIdAndRemove(_id, { select: 'name' }, done);
    M.findByIdAndRemove(_id, done);

    function done (err, doc) {
      should.strictEqual(null, err);
      should.strictEqual(null, doc); // no previously existing doc
      if (--pending) return;
      db.close();
    }
  }