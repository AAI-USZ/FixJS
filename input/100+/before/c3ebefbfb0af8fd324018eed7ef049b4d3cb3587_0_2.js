function(config, options) {
    var bundle_config, filename, _results;
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
    _results = [];
    for (filename in config) {
      bundle_config = config[filename];
      _results.push(mb.writeBundleSync(filename, bundle_config, options));
    }
    return _results;
  }