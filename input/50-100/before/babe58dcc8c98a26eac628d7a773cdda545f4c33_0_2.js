function pathsFromGlob(filepath, cb) {
  // add extension wildcard
  if (pathLib.extname(filepath) === "") {
    filepath += ".*"
  }
  glob(filepath, cb);
  // var filepaths = glob.sync(filepath);
  // cb(null, filepaths);
}