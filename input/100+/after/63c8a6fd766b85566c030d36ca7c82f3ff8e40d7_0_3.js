function(err, stats) {
      if (err) return callback(err);

      // use the cached version if it exists and is recent enough
      var c = options.cache[options.cacheKey],
          ext, dir;
      if (c && stats.mtime.getTime() <= c.mtime.getTime()) {
        winston.verbose('get template from cache: ' + options.cacheKey);
        return callback(null, c);
      }

      winston.verbose('compile template: ' + file);
      compile(foundfile, options, function(err, t) {
        if (err) return callback(err);
        if (options.processTemplate) options.processTemplate(t, options);
        t.mtime = stats.mtime;
        options.cache[options.cacheKey] = t;
        callback(null, t);
      });
    }