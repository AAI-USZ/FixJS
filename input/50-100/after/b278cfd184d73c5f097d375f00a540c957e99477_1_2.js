function (dir) {
  if (this.subclassMatches('Libraries', 'path') && envCheck()) {
    if (type.isString(dir)) {
      dir = path.resolve(dir);
      if (!fs.existsSync(dir)) {
        error('could not resolve the libraries path - ' + dir + ' does not exist');
      }
      o.libDir = dir;
    }
  }
  return this;
}