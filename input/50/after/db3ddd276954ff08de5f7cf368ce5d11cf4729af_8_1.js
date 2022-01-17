function() {
    var options = grunt.helper("options", this, {logLevel: 0});

    grunt.verbose.writeflags(options, "Options");

    requirejs.optimize(options);
  }