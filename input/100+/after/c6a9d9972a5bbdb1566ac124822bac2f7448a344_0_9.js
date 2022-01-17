function mkdir(path, options, callback) {
    if (!checkType([
      "path", path, "string",
      "options", options, "object"
    ], callback)) return;

    var meta = {};
    // Make sure the user has access to the parent directory and get the real path.
    realpath(dirname(path), function (err, dir) {
      if (err) return callback(err);
      path = join(dir, basename(path));
      fs.mkdir(path, function (err) {
        if (err) return callback(err);
        if (checkPermissions) {
          // Set the new file to the specified user
          fs.chown(path, fsUid, fsGid, function (err) {
            if (err) return callback(err);
            callback(null, meta);
          });
        } else {
          callback(null, meta);
        }
      });
    });
  }