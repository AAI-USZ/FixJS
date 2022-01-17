function(path, options) {
    var package = this;
    package.pathsToAdd.push([path, options]);
    setTimeout(function() {
      orderedAsync.concat(package.pathsToAdd, _.bind(package._addPath, package), function(err, paths) {
        if (err) throw err;
        var currentFilePaths = _(package.paths).map(function(p) { return p.path; });
        paths.forEach(function(p) {
          if (currentFilePaths.indexOf(p.path) == -1) {
            package.paths.push(p);
            currentFilePaths.push(p.path);
          }
        });
      });
    }, 0);
  }