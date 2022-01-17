function(cb) {
    if (self.token) {
      self.get('/me', function(me) {
        cb(me);
      });
    } else {
      cb();
    }
  }