function (error) {
    if (error) return callback(error, null);

    // execute callback when all files are compiled
    self.updateCache(function (error) {
      callback(error, self);
    });
  }