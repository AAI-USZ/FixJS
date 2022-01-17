function copy(path, options, callback) {
    if (!checkType([
      "path", path, "string",
      "options", options, "object"
    ], callback)) return;

    var meta = {};
    mkfile(path, {}, function (err, writeMeta) {
      if (err) return callback(err);
      readfile(options.from, {}, function (err, readMeta) {
        if (err) return callback(err);
        readMeta.stream.pipe(writeMeta.stream);
        writeMeta.stream.on("error", callback);
        writeMeta.stream.on("saved", function () {
          callback(null, meta);
        });
      });
    });
  }