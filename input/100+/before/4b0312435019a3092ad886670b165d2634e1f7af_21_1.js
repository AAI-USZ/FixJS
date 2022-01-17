function(filePattern, paths) {
    var file, files, k, packaged, required, s, v, _i, _len;
    files = findSync(filePattern, 'js', paths);
    packaged = {};
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      file = files[_i];
      try {
        required = require(file);
        for (k in required) {
          v = required[k];
          packaged[k] = v;
        }
      } catch (e) {
        s = error("" + ("Broken file " + file).red + "\n\n" + e.stack);
        puts(s.red);
      }
    }
    return packaged;
  }