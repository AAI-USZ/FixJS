function(sourcePath, source) {
        var callback, options, result;
        result = "";
        libs.less || (libs.less = this.patchLess(require('less')));
        options = this.optionsMap;
        options.filename = sourcePath;
        options.paths = [path.dirname(sourcePath)].concat(options.paths);
        callback = function(err, tree) {
          if (err) console.log("FEhler", err);
          if (err) throw err;
          return result = tree.toCSS({});
        };
        new libs.less.Parser(options).parse(source, callback);
        return result;
      }