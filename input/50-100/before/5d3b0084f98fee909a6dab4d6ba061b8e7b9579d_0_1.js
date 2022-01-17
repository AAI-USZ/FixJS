function rmdir(path, options, callback) {
    if (!checkType([
      "path", path, "string",
      "options", options, "object",
    ], callback)) return;

    if (options.recursive) {
      remove(path, function(path, callback) {
        exec("rm", {args: ["-rf", path]}, callback);
      }, callback);
    }
    else {
      remove(path, fs.rmdir, callback);
    }
  }