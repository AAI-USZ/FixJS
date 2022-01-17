function(err, fname) {
      if (path.basename(fpath) === fname) {
        normalizeCall(fpath, cb);
      }
    }