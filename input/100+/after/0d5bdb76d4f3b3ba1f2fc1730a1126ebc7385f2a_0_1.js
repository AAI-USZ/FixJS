function(base,extension) {
  try {
    // In case of double mapping (if required from variable/s)
    if (extension.indexOf(base) !== -1) {
      var regex = new RegExp(base, 'g');
      extension = extension.replace(regex, "/").substring(1);
    }
    // Full Path
    var path = base + extension;
    //Try platform specific path first
    var platform_path =  base + (os === "android" ? "android" : "iphone") + "/" + extension;
    var file = Ti.Filesystem.getFile(platform_path + ".js");
    if (file.exists()) {
      path = platform_path;   
    }
    // Is the CommonJS module in the cache
    if (cache[path]) {
      return cache[path];
    }
    var mod;
    if (os === "android") {
      mod = require(require("com.yydigital.zip").absolute(path + ".js"));
    } else {
      mod = require(path);
    }
    cache[path] = mod;
    return mod;
  } catch(e) {
    log.error(e.toString());
  }
}