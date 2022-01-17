function (err, path) {
      if (err) return callback(err);
      meta.unwatchFile = fs.unwatchFile(path);
      callback(null, meta);
    }