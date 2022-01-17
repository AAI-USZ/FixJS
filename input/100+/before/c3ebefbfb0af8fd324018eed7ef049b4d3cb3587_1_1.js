function(filename, config, options) {
    var code, directory;
    if (!filename) {
      throw 'module-bundler: missing output filename or object';
    }
    if (!config) {
      throw 'module-bundler: missing config object';
    }
    if (!(options && options.cwd)) {
      throw 'module-bundler: missing options.cwd';
    }
    try {
      directory = path.dirname(filename);
      if (!path.existsSync(directory)) {
        wrench.mkdirSyncRecursive(directory, 0x1ff);
      }
    } catch (e) {
      if (e.code !== 'EEXIST') {
        throw e;
      }
    }
    code = "(function() {\n\n  " + (mb.generateBundleCode(config, options)) + "\n})(this);";
    return fs.writeFileSync(filename, code, 'utf8');
  }