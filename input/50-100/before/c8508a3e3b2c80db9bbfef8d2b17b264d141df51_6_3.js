function(cb) {
    _db.hkeys("channel", function(err, last) {
      cb(last);
    });
  }