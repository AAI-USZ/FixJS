function (err, path) {
      if (err) return callback(err);
      if (options.file) {
        meta.watcher = fs.watchFile(path, options, function () {});
        meta.watcher.close = function () {
          fs.unwatchFile(path);
        };
      }
      else {
        meta.watcher = fs.watch(path, options);
      }
      callback(null, meta);
    }