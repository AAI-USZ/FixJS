function(exceptFolders, cb) {
      var filter,
        _this = this;
      if (exceptFolders == null) {
        exceptFolders = [];
      }
      cb || (cb = function(errors) {
        var e, _i, _len, _results;
        if (errors) {
          _results = [];
          for (_i = 0, _len = errors.length; _i < _len; _i++) {
            e = errors[_i];
            _results.push(logger.error(e.toString()));
          }
          return _results;
        } else {
          return logger.info("Build done.");
        }
      });
      filter = function(f, stat) {
        var _ref;
        if (stat.isDirectory() && (_ref = path.basename(f), __indexOf.call(exceptFolders, _ref) >= 0)) {
          return false;
        }
        if (stat.isDirectory()) {
          return true;
        }
        return /\.(coffee|js|styl|jade)$/.test(f);
      };
      return walk("src", filter, function(err, files) {
        if (err) {
          return logger.error(err);
        }
        return _this.liveBuildAll(files, cb);
      });
    }