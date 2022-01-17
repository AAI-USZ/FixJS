function (error, list) {
    if (error) return callback(error, null);

    // save directory map
    self.cache.dirMap = list.map(function (value) {
      return value.slice(modulePath.length);
    });

    // execute callback when all files are compiled
    self.compiler.compile(function (error) {
      if (error) return callback(error);

      build();
      callback();
    });
  }