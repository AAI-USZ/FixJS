function() {
    var options = grunt.helper("options", this, {logLevel: 0});
    requirejs.optimize(options);
  }