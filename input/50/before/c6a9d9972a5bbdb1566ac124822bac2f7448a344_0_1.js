function rmfile(path, options, callback) {
    if (!checkType([
      "path", path, "string",
      "options", options, "object",
    ], callback)) return;

    remove(path, fs.unlink, callback);
  }