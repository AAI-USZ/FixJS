function() {
    var options = this.options({force: false});

    grunt.verbose.writeflags(options, "Options");

    var validPaths = grunt.file.expand(this.file.src);

    if (validPaths.length === 0) {
      grunt.fatal("should have an array of valid paths to clean by now, too dangerous to continue.");
    }

    validPaths.forEach(function(path) {
      if (options.force === false && isOutsideCWD(path)) {
        grunt.fail.warn('trying to clean "' + path + '" which is outside the working dir.');
      }

      grunt.helper("clean", path);
    });
  }