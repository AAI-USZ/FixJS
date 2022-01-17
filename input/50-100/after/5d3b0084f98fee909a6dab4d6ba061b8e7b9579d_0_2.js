function watchDirectory(path, options, callback) {
    if (!checkType([
      "path", path, "string",
      "options", options, "object"
    ], callback)) return;

    var meta = {};
    realpath(path, function (err, path) {
      if (err) return callback(err);
      meta.watcher = fs.watch(path, options, function (event, filename) {});
      callback(null, meta);
    });
  }