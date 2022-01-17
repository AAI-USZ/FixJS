function pathsFromGlob(path, cb) {
  var filepath = path;
  // add extension wildcard
  if (pathLib.extname(filepath) === "") {
    filepath += ".*"
  }
  if (process.platform === "win32") {
    filepath = filepath.replace(/\\/g, '/');
  }
  glob(filepath, function(err, paths) {
    if (paths.length == 0) {
      cb(err, [path]);
    } else {
      cb(err, paths);
    }
  });
}