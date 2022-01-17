function symlink(path, options, callback) {
    if (!checkType([
      "path", path, "string",
      "options", options, "object"
    ], callback)) return;

    var meta = {};
    // Get real path to target dir
    realpath(dirname(path), function (err, dir) {
      if (err) return callback(err);
      // Make sure the user can modify the target directory
      statSafe(dir, 2, function (err) {
        if (err) return callback(err);
        fs.symlink(options.target, join(dir, basename(path)), function (err) {
          if (err) return callback(err);
          callback(null, meta);
        });
      });
    });
  }