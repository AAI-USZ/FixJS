function pathsFromGlob(path, cb) {
  var filepath = path;
  // add extension wildcard
  if (pathLib.extname(filepath) === "") {
    filepath += ".*"
  }
  glob(filepath, function(err, paths) {
    if (paths.length == 0) {
      cb(err, [path]);
    } else {
      cb(err, paths);
    }
  });
}