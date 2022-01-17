function(err, paths) {
    if (paths.length == 0) {
      cb(err, [path]);
    } else {
      cb(err, paths);
    }
  }