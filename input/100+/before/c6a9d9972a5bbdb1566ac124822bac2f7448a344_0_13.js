function changedSince(paths, options, callback) {
    if (!checkType([
      "paths", paths, "array",
      "options", options, "object",
    ], callback)) return;

    if (!options.since) {
      return callback(new Error("since is a required option"));
    }
    var since = (new Date(options.since)).getTime();
    var length = paths.length;
    var meta = {};
    var changed = meta.changed = [];
    var errors = {};
    var offset = 0;
    (function next() {
      if (offset === length) done();
      var filePath = paths[offset];
      realpath(filePath, function (err, path) {
        if (err) {
          errors[filePath] = err;
          return next();
        }
        fs.stat(path, function (err, stat) {
          if (err) {
            errors[filePath] = err;
            return next();
          }
          var mtime = stat.mtime.getTime();
          if (mtime > since) {
            changed.push(filePath);
          }
          next();
        });
      });
      offset++;
    }());
    function done() {
      if (Object.keys(errors).length) {
        meta.errors = errors;
      }
      callback(null, meta);
    }
  }