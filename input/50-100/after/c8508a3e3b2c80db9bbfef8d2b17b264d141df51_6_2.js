function(name, user, cb) {
    if(name) {
      _db.del("user:" + name + ":" + user, function(err, last) {
        count(name, cb);
      });
    } else {
      if(cb) {
        cb();
      }
    }
  }