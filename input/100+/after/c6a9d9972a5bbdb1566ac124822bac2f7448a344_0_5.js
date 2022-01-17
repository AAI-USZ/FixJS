function readdir(path, options, callback) {
    if (!checkType([
      "path", path, "string",
      "options", options, "object"
    ], callback)) return;

    var meta = {};

    realpath(path, function (err, path) {
      if (err) return callback(err);
      statSafe(path, 4/*READ*/, function (err, stat) {
        if (err) return callback(err);
        if (!stat.isDirectory()) {
          return callback(new Error("Requested resource is not a directory"));
        }

        // ETag support
        meta.etag = calcEtag(stat);
        if (options.etag === meta.etag) {
          meta.notModified = true;
          return callback(null, meta);
        }

        fs.readdir(path, function (err, files) {
          if (err) return callback(err);
          if (options.head) {
            return callback(null, meta);
          }
          var stream = new Stream();
          stream.readable = true;
          var paused;
          stream.pause = function () {
            if (paused === true) return;
            paused = true;
          };
          stream.resume = function () {
            if (paused === false) return;
            paused = false;
            getNext();
          };
          meta.stream = stream;
          callback(null, meta);
          var index = 0;
          stream.resume();
          function getNext() {
            if (index === files.length) return done();
            var file = files[index++];
            var fullpath = join(path, file);

            if (stat.access & 1/*EXEC/SEARCH*/) { // Can they enter the directory?
              createStatEntry(file, fullpath, onStatEntry);
            }
            else {
              var err = new Error("EACCESS: Permission Denied");
              err.code = "EACCESS";
              onStatEntry({
                name: file,
                err: err
              });
            }
            function onStatEntry(entry) {
              stream.emit("data", entry);

              if (!paused) {
                getNext();
              }
            }
          }
          function done() {
            stream.emit("end");
          }
        });
      });
    });
  }