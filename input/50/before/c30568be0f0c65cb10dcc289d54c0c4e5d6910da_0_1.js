function(args, options) {
    return spawn(__dirname + '/../bin/toaster', args, options || {
      cwd: __dirname
    });
  }