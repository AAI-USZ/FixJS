function buildPackage(callback) {

    var dirMap = self.build.modules.dirMap,
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
      self.build.modules.packageMap = final;
      callback(null, null);
    });
  }