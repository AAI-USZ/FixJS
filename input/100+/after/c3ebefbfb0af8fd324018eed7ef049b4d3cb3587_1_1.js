function(filename, config, options) {
    var bundle_code, directory, resolved_filename;
    if (!filename) {
      throw 'module-bundler: missing output filename or object';
    }
    if (!config) {
      throw 'module-bundler: missing config object';
    }
    if (!(options && options.cwd)) {
      throw 'module-bundler: missing options.cwd';
    }
    bundle_code = mb.generateBundleCode(config, options);
    if (!bundle_code) {
      return false;
    }
    resolved_filename = mb.resolveSafe(filename, options);
    try {
      directory = path.dirname(resolved_filename);
      if (!path.existsSync(directory)) {
        wrench.mkdirSyncRecursive(directory, 0x1ff);
      }
    } catch (e) {
      if (e.code !== 'EEXIST') {
        throw e;
      }
    }
    fs.writeFileSync(resolved_filename, "(function() {\n" + bundle_code + "})(this);\n", 'utf8');
    return true;
  }