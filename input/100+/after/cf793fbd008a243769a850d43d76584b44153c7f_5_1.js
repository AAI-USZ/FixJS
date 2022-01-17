function(code, options, js){
    var filename, main, dirname, __ref;
    if (options != null) {
      filename = options.filename;
    }
    main = require.main;
    if (filename) {
      dirname = path.dirname(fs.realpathSync(filename = process.argv[1] = path.resolve(filename)));
    } else {
      dirname = filename = '.';
    }
    main.paths = main.constructor._nodeModulePaths(dirname);
    main.filename = filename;
    js || (code = LiveScript.compile(code, (__ref = {}, __import(__ref, options), __ref.bare = true, __ref)));
    try {
      return main._compile(code, filename);
    } catch (e) {
      throw hackTrace(e, code, filename);
    }
  }