function(path) {
  var pathLength;
  if (pathlib.existsSync(path)) {
    staticDirs = fs.readdirSync(path);
    if (!(staticDirs.indexOf('assets') >= 0)) staticDirs.push('assets');
    pathLength = path.length;
    staticFiles = fileUtils.readDirSync(path).files;
    return staticFiles = staticFiles.map(function(file) {
      return file.substr(pathLength);
    });
  }
}