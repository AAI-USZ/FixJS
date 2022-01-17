function watchFile(path, options, callback) {
    if (!checkType([
      "path", path, "string",
      "options", options, "object"
    ], callback)) return;

    var meta = {};
    realpath(path, function (err, path) {
      if (err) return callback(err);
      meta.watcher = fs.watchFile(path, options, function (curr, prev) {});
      callback(null, meta);
    });
  }