function(grunt) {
  "use strict";

  var requirejs = require('requirejs');

  // TODO: extend this to send build log to grunt.log.ok / grunt.log.error
  // by overriding the r.js logger (or submit issue to r.js to expand logging support)
  requirejs.define('node/print', [], function() {
    return function print(msg) {
      if (msg.substring(0, 5) === "Error") {
        grunt.log.errorlns(msg);
        grunt.fail.warn("RequireJS failed.");
      } else {
        grunt.log.oklns(msg);
      }
    };
  });

  grunt.registerMultiTask("requirejs", "Build a RequireJS project.", function() {
    var options = grunt.helper("options", this, {logLevel: 0});

    grunt.verbose.writeflags(options, "Options");

    requirejs.optimize(options);
  });
}