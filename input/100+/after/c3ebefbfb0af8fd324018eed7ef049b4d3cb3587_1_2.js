function(config, options) {
    var bundle_config, filename, success;
    if (!config) {
      throw 'module-bundler: missing config filename or object';
    }
    if (!(options && options.cwd)) {
      throw 'module-bundler: missing options.cwd';
    }
    if (isString(config)) {
      try {
        config = require(mb.resolveSafe(config, options));
      } catch (e) {
        console.log(e.message);
        return;
      }
    }
    success = true;
    for (filename in config) {
      bundle_config = config[filename];
      success &= mb.writeBundleSync(filename, bundle_config, options);
    }
    return success;
  }