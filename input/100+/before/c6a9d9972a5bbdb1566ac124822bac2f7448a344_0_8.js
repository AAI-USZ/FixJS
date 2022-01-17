function mkfile(path, options, callback) {
    if (!checkType([
      "path", path, "string",
      "options", options, "object",
    ], callback)) return;

    var meta = {};

    // Make sure the user has access to the directory and get the real path.
    realpath(dirname(path), function (err, dir) {
      if (err) return callback(err);
      path = join(dir, basename(path));
      // Use a temp file for both atomic saves and to ensure we never write to
      // existing files.  Writing to an existing symlink would bypass the
      // security restrictions.
      var tmpPath = path + "." + (Date.now() + Math.random() * 0x100000000).toString(36) + ".tmp";
      // node 0.8.x adds a "wx" shortcut, but since it's not in 0.6.x we use the
      // longhand here.
      var flags = constants.O_CREAT | constants.O_WRONLY | constants.O_EXCL;
      fs.open(tmpPath, flags, umask & 0666, function (err, fd) {
        if (err) return callback(err);
        options.fd = fd;
        if (checkPermissions) {
          // Set the new file to the specified user
          fs.fchown(fd, fsUid, fsGid, function (err) {
            if (err) {
              fs.close(fd);
              return callback(err);
            }
            onCreate();
          });
        } else {
          onCreate();
        }
        function onCreate() {
          var stream = new fs.WriteStream(path, options);
          var hadError;
          stream.once('error', function () {
            hadError = true;
          });
          stream.on('close', function () {
            if (hadError) return;
            fs.rename(tmpPath, path, function (err) {
              if (err) return stream.emit("error", err);
              stream.emit("saved");
            });
          });
          meta.stream = stream;
          meta.tmpPath = tmpPath;
          callback(null, meta);
        }
      });
    });
  }