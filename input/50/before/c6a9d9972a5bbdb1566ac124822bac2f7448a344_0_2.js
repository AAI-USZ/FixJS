function (err, path) {
      if (err) return callback(err);
      fs.unwatchFile(path);
      callback(null);
    }