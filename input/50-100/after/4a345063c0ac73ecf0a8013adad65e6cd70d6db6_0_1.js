function(err, fname) {
    if (is.File(fpath)) {
      normalizeCall(fpath, cb);
      watch(fpath, cb);
    } else {
      normalizeCall(path.join(fpath, fname), cb);
    }
  }