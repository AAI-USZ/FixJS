function stat(path, options, callback) {
    if (!checkType([
      "path", path, "string",
      "options", options, "object",
    ], callback)) return;

    // Make sure the parent directory is accessable
    realpath(dirname(path), function (err, dir) {
      if (err) return callback(err);
      // Make sure they can enter the parent directory too
      statSafe(dir, 1/*EXEC/SEARCH*/, function (err) {
        if (err) return callback(err);
        var file = basename(path);
        path = join(dir, file);
        createStatEntry(file, path, function (entry) {
          if (entry.err) {
            return callback(entry.err);
          }
          callback(null, entry);
        });
      });
    });
  }