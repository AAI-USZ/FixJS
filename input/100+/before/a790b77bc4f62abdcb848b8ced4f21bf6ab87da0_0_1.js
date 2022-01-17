function (error) {
    if (error) return callback(error, null);

    // create directory map
    readdir(modulePath, function (error, list) {
      if (error) return callback(error, null);

      // save directory map
      self.cache.dirMap = list.map(function (value) {
        return value.slice(modulePath.length);
      });

      // execute callback when all files are compiled
      if (piccolo.get('precompile')) {
        compiler.compile(callback.bind(null, null, self));
      } else {
        callback(null, self);
      }
    });
  }