function (callback) {
  var self = this;
  var modulePath = this.piccolo.get('modules');

  // create directory map
  readdir(modulePath, function (error, list) {
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
  });

  // rebuild dependency tree
  function build() {
    var dependencies = self.build.dependencies = {};
    self.build.mtime = self.cache.stats;

    // deep resolve all dependencies
    self.cache.dirMap.forEach(function (filename) {
      var list = [];

      // the result array will be filled by his function
      deepResovle(self, filename, list);

      // dry result array
      var result = dependencies[filename] = [];
      var i = list.length;
      while(i--) {
        if (result.indexOf(list[i]) === -1) {
          result.push(list[i]);
        }
      }

    });
  }
}