function watch(fpath, cb) {

  // Due to the unstalbe fs.watch(), if the `fpath` is a file then 
  // switch to watch its parent directory instead of watch it directly. 
  // Once the logged filename matches it then triggers the callback function.
  if (is.File(fpath)) {
    var parent = path.resolve(fpath, '..');
    fs.watch(parent, function(err, fname) {
      if (path.basename(fpath) === fname) {
        normalizeCall(fpath, cb);
      }
    });                        
  } else if (is.Directory(fpath)) {
    fs.watch(fpath, function(err, fname) {
      normalizeCall(path.join(fpath, fname), cb);
    });
    // Recursively watch its sub-directories. 
    sub(fpath, function(dir) {
      watch(dir, cb);
    });    
  }

}