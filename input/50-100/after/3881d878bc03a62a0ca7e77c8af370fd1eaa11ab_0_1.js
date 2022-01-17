function watch(fpath, cb) {
  fs.watch(fpath, function(err, fname) {
    normalizeCall(
        is.File(fpath) ? fname : path.join(fpath, fname)
      , cb
    );
  });

  if (is.Directory(fpath)) {
    sub(fpath, function(dir) {
      watch(dir, cb);
    }); 
  }
}