function() {
    initTestDB(this.name, function(err, db) {
      db.bulkDocs({docs: authors}, function (err, res) {
        db.bulkDocs({docs: authors}, function (err, res) {
          db.allDocs(function(err, result) {
            ok(result.total_rows === 8, 'correct number of results');
            start();
          });
        });
      });
    });
  }