function(err, result) {
    if (err) {
      return cb(new Error(err));
    }
    return cb(null, result);
  }