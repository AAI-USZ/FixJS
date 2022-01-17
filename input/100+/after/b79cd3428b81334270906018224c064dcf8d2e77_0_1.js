function (error, content) {
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
      }