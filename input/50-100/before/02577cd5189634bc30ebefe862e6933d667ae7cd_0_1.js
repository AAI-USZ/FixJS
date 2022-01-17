function expandDirectoryWithRegexp(directory, regexp) {
    var paths = [];
    var scannedPaths = findit.sync(directory);
    scannedPaths.forEach(function(path) {
      if (regexp.test(path))
        paths.push(path);
    });
    return paths;
  }