function buildPackage(callback) {

    var dirMap = self.build.modules.dirMap,
        i = dirMap.length,
        filepath,
        pkgName = '/package.json',
        pkgLength = pkgName.length,
        list = [];

    // search dirmap for package.json
    while(i--) {
      filepath = dirMap[i];
      if (filepath.slice(filepath.length - pkgLength, filepath.length) === pkgName) {
        list.push(filepath);
      }
    }

    function resolvePackage(filepath, callback) {
      var dirname = filepath.slice(0, filepath.length - pkgLength);
      var fullpath = path.resolve(self.piccolo.get('modules'), './' + filepath);

      var response = { key: dirname };

      fs.readFile(fullpath, 'utf8', function (error, content) {
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
          filepath = path.resolve(dirname, './index.js');
        }

        // check that file exist
        var fullpath = path.resolve(self.piccolo.get('modules'), './' + filepath);
        fs.exists(fullpath, function (exist) {
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
        final[obj.key] = obj.value;
      });

      // save resolved packageMap
      self.build.modules.packageMap = final;
      callback(null, null);
    });
  }