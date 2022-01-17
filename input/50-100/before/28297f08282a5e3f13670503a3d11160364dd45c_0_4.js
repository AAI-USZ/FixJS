function (error, filepath) {
    if (error) return callback(error, null);

    // get prebuild dependencies map
    var dependencies = dependenciesList(self, filepath, cache);

    async.map(dependencies, handleMap.bind(null, self), callback);
  }