function(args, options) {
    options = options || {
      cwd: __dirname
    };
    return spawn(__dirname + '/../bin/toaster', args, options);
  }