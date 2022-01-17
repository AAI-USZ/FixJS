function() {
    console.info('testing: Modify a doc');
    initTestDB(this.name, function(err, db) {
      ok(!err, 'opened the pouch');
      db.post({test: "somestuff"}, function (err, info) {
        ok(!err, 'saved a doc with post');
        db.put({_id: info.id, _rev: info.rev, another: 'test'}, function(err, info2) {
          ok(!err && info2.rev !== info._rev, 'updated a doc with put');
          start();
        });
      });
    });
  }