function getTemplate(file, options, callback) {
  if (options.noFileCheck && options.cache && options.cache[options.cacheKey]) {
    winston.verbose('get template from cache with no filecheck: ' + options.cacheKey);
    return callback(null, options.cache[options.cacheKey]);
  }
  findfilep(file, function(err, foundfile) {
    if (err) return callback(err);
    fs.stat(foundfile, function(err, stats) {
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
    });
  });
}