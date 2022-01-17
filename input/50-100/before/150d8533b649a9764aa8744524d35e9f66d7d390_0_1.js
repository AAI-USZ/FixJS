function(err, stats) {
    if (err) {
      stats.status = 404;
      cb(err);
    } else {
      fs.unlink(path, function (err) {
        if (err) {
          err.status = 500;
          cb(err);
        } else {
          cb();
        }
      });
    }
  }