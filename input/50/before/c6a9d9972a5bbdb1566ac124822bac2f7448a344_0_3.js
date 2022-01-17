function unwatchFile(path, callback) {
    realpath(path, function (err, path) {
      if (err) return callback(err);
      fs.unwatchFile(path);
      callback(null);
    });
  }