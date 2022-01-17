function build() {
    var dependencies = self.build.dependencies = {};
    var cacheTime = self.cache.stats;
    var buildTime = self.build.mtime;

    Object.keys(cacheTime).forEach(function (filepath) {
      buildTime[filepath] = cacheTime[filepath].getTime();
    });

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