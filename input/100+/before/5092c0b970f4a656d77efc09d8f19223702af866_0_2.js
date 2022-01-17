function(path, options) {
    var package = this;
    options = options || {};
    options.isCss = package.isCss();
    pathsFromGlob(path, function(err, paths) {
      var newPaths = [];
      paths.forEach(function(filepath) {
        var opts = _.clone(options);
        opts.path = filepath;
        newPaths.push(new Path(opts));
      });
      expandPaths(newPaths, function(err, expandedPaths) {
        if (err) throw err;
        var currentFilePaths = _(package.paths).map(function(p) { return p.path; });
        expandedPaths.forEach(function(p) {
          if (currentFilePaths.indexOf(p.path) == -1) {
            package.paths.push(p);
            currentFilePaths.push(p.path);
          }
        });
      });
    });
  }