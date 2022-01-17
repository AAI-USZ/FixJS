function watch(fpath, cb) {

  // Due to the unstalbe fs.watch(), swtiches to watch its parent 
  // directory when watching a single file, instead of watch it 
  // directly. And then triggers the callback function whenever the 
  // logged filename matches it.
  if (is.File(fpath)) {
    var parent = path.resolve(fpath, '..');
    fs.watch(parent, function(err, fname) {
      if (path.basename(fpath) == fname) {
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