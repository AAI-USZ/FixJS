function(sourcePath, source) {
        var callback, compress, options, result, _ref;
        result = "";
        libs.less || (libs.less = this.patchLess(require('less')));
        options = this.optionsMap;
        options.filename = sourcePath;
        options.paths = [path.dirname(sourcePath)].concat(options.paths);
        compress = (_ref = this.compress) != null ? _ref : false;
        callback = function(err, tree) {
          if (err) throw err;
          return result = tree.toCSS({
            compress: compress
          });
        };
        new libs.less.Parser(options).parse(source, callback);
        return result;
      }