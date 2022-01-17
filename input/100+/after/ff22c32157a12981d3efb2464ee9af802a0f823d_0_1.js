function() {
    var options = grunt.helper("options", this, {force: false});
    var config = grunt.config.get("clean");
    var paths = this.data.files || this.data;
    var validPaths = [];

    grunt.verbose.writeflags(options, "Options");

    // check if we have a valid config & an invalid target specific config
    if (kindOf(config) === "array" && kindOf(paths) !== "array") {
      paths = config;
    } else if (kindOf(paths) !== "array") {
      paths = [];
    }

    paths.forEach(function(path) {
      path = grunt.template.process(path);

      if (path.length > 0) {
        validPaths.push(path);
      }
    });

    validPaths = grunt.file.expand(validPaths);

    if (validPaths.length === 0) {
      grunt.fatal("should have an array of valid paths to clean by now, too dangerous to continue.");
    }

    validPaths.forEach(function(path) {
      if (options.force === true && existsSync(path) && isOutsideCWD(path)) {
        grunt.fail.warn('trying to clean "' + path + '" which is outside the working dir.');
      }

      grunt.helper("clean", path);
    });
  }