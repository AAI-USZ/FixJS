function(file, acc){
    var stat, files, f, __i, __len;
    acc == null && (acc = []);
    stat = fs.stat.sync(fs, file);
    if (stat.isDirectory()) {
      files = fs.readdir.sync(fs, file);
      for (__i = 0, __len = files.length; __i < __len; ++__i) {
        f = files[__i];
        acc.concat(walk(path.join(file, f), acc));
      }
    } else {
      acc.push(file);
    }
    return acc;
  }