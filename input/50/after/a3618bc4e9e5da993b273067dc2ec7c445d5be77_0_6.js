function(err) {
      if (err && err.errno !== process.EEXIST) {
        return callback(err);
      }
      fs.mkdirSync(dir, mode);
      return callback();
    }