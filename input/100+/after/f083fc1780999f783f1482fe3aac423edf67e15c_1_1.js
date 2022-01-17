function() {
    console.info('Starting Test: replication notifications');
    var self = this;
    var changes = 0;
    var onChange = function(c) {
      changes++;
      ok(true, 'Got change notification');
      if (changes === 3) {
        ok(true, 'Got all change notification');
        start();
      }
    }
    initDBPair(this.name, this.remote, function(db, remote) {
      remote.bulkDocs({docs: docs}, {}, function(err, results) {
        db.replicate.from(self.remote, {onChange: onChange});
      });
    });
  }