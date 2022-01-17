function(err, stdout, stderr) {
      if (err) {
        grunt.fail.fatal(stderr);
      }
      done();
    }