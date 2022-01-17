function() {
    var options = grunt.helper("options", this, {force: false});
    var config = grunt.config.get("clean");
    var paths = this.data.files || this.data;

    grunt.verbose.writeflags(options, "Options");

    // check if we have a valid config & an invalid target specific config
    if (kindOf(config) === "array" && kindOf(paths) !== "array") {
      paths = config;
    } else if (kindOf(paths) !== "array") {
      paths = [];
    }

    var validPaths = grunt.file.expand(paths);

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