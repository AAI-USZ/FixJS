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

    // scan and resolve all packages
    buildPackage(function () {
      if (error) return callback(error);

      // execute callback when all files are compiled
      self.compiler.compile(function (error) {
        if (error) return callback(error);

        buildMap();
        callback();
      });
    });
  });

  // scan and resolve all packages
  function buildPackage(callback) {

    var dirMap = self.cache.dirMap,
        i = dirMap.length,
        path,
        pkgName = '/package.json',
        pkgLength = pkgName.length,
        list = [];

    // search dirmap for package.json
    while(i--) {
      path = dirMap[i];
      if (path.slice(path.length - pkgLength, path.length) === pkgName) {
        list.push(path);
      }
    }

    function resolvePackage(filepath, callback) {
      var dirname = path.slice(0, filepath.length - pkgLength);

      var response = { key: dirname };

      fs.readFile(filepath, 'utf8', function (error, content) {
        if (error) return callback(error, null);

        // remove BOM
        content = removeBOM(content);

        // use index if filepath is empty
        var filepath;
        if (content === '') {
          filepath = path.resolve(dirname, 'index.js');
        }

        // read JSON file
        var result;
        try {
          result = JSON.parse(content);
        } catch (e) {
          return callback(e, null);
        }

        if (result.main) {
          filepath = path.resolve(dirname, result.main);
        } else {
          filepath = path.resolve(dirname, 'index.js');
        }

        // check that file exist
        fs.exist(filepath, function (exist) {
          response.value = exist ? filepath : false;
          callback(null, response);
        });
      });
    }

    // read all package.json files and resolve the filepath
    async.map(list, resolvePackage, function (error, list) {
      if (error) return callback(error, null);

      var final = {};
      list.forEach(function (obj) {
        final[obj.key] = final[obj.value];
      });

      // save resolved packageMap
      self.build.packageMap = final;
    });
  }

  // rebuild dependency tree
  function buildMap() {
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
}