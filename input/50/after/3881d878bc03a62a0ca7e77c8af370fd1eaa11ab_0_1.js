function(err, fname) {
    normalizeCall(
        is.File(fpath) ? fname : path.join(fpath, fname)
      , cb
    );
  }