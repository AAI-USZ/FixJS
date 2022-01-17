function () {
    var db = start()
      , M = db.model(modelname, collection + random())
      , pending = 5

    M.findOneAndRemove({ name: 'aaron1' }, { select: 'name' }, done);
    M.findOneAndRemove({ name: 'aaron1' }, done);
    M.where().findOneAndRemove({ name: 'aaron1' }, { select: 'name' }, done);
    M.where().findOneAndRemove({ name: 'aaron1' }, done);
    M.where('name', 'aaron1').findOneAndRemove(done);

    function done (err, doc) {
      should.strictEqual(null, err);
      should.strictEqual(null, doc); // no previously existing doc
      if (--pending) return;
      db.close();
    }
  }