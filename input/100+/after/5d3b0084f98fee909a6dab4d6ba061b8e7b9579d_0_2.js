function readfile(path, options, callback) {
    if (!checkType([
      "path", path, "string",
      "options", options, "object"
    ], callback)) return;

    var meta = {};

    open(path, "r", umask & 0666, function (err, path, fd, stat) {
      if (err) return callback(err);
      if (!stat.isFile()) {
        fs.close(fd);
        return callback(new Error("Requested resource is not a file"));
      }

      // Basic file info
      meta.mime = getMime(path);
      meta.size = stat.size;
      meta.etag = calcEtag(stat);

      // ETag support
      if (options.etag === meta.etag) {
        meta.notModified = true;
        fs.close(fd);
        return callback(null, meta);
      }

      // Range support
      if (options.hasOwnProperty('range') && !(options.range.etag && options.range.etag !== meta.etag)) {
        var range = options.range;
        var start, end;
        if (range.hasOwnProperty("start")) {
          start = range.start;
          end = range.hasOwnProperty("end") ? range.end : meta.size - 1;
        }
        else {
          if (range.hasOwnProperty("end")) {
            start = meta.size - range.end;
            end = meta.size - 1;
          }
          else {
            meta.rangeNotSatisfiable = "Invalid Range";
            fs.close(fd);
            return callback(null, meta);
          }
        }
        if (end < start || start < 0 || end >= stat.size) {
          meta.rangeNotSatisfiable = "Range out of bounds";
          fs.close(fd);
          return callback(null, meta);
        }
        options.start = start;
        options.end = end;
        meta.size = end - start + 1;
        meta.partialContent = { start: start, end: end, size: stat.size };
      }

      // HEAD request support
      if (options.hasOwnProperty("head")) {
        fs.close(fd);
        return callback(null, meta);
      }

      // Read the file as a stream
      try {
        options.fd = fd;
        meta.stream = new fs.ReadStream(path, options);
      } catch (err) {
        fs.close(fd);
        return callback(err);
      }
      callback(null, meta);
    });
  }