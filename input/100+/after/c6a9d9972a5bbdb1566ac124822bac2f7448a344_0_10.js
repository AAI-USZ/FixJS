function rename(path, options, callback) {
    if (!checkType([
      "path", path, "string",
      "options", options, "object"
    ], callback)) return;

    var meta = {};
    // Get real path to target dir
    realpath(dirname(path), function (err, dir) {
      if (err) return callback(err);
      // Make sure the user can modify the target directory
      statSafe(dir, 2/*WRITE*/, function (err) {
        if (err) return callback(err);
        // Make sure the source file is accessable
        realpath(options.from, function (err, from) {
          if (err) return callback(err);
          // Make sure the user can modify the source directory
          statSafe(dirname(from), 2/*WRITE*/, function (err) {
            if (err) return callback(err);
            // Rename the file
            fs.rename(from, join(dir, basename(path)), function (err) {
              if (err) return callback(err);
              callback(null, meta);
            });
          });
        });
      });
    });
  }