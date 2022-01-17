function(dir, mode, callback) {
    var pathParts;
    pathParts = path.normalize(dir).split('/');
    if (path.existsSync(dir)) return callback(null);
    return mkdirRecursive(pathParts.slice(0, -1).join('/'), mode, function(err) {
      if (err && err.errno !== process.EEXIST) return callback(err);
      fs.mkdirSync(dir, mode);
      return callback();
    });
  }