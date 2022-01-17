function(cb) {
    console.log(self.token);
    if (self.token) {
      self.get('/me', function(me) {
        cb(me);
      });
    } else {
      cb();
    }
  }