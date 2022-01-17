function() {
  var JASMINE, Neat, path, run;

  path = require('path');

  Neat = require('../../../neat');

  run = require('../../../utils/commands').run;

  JASMINE = "" + Neat.root + "/node_modules/.bin/jasmine-node";

  module.exports = function(config) {
    return config.engines.tests.jasmine = function(callback) {
      var args, msg;
      if (!path.existsSync(JASMINE)) {
        msg = "" + (red("Can't find jasmine-node module")) + "\n\nRun " + (yellow('neat install')) + " to install the dependencies.";
        return typeof callback === "function" ? callback(new Error(msg)) : void 0;
      }
      args = ['.', '--color', '--coffee', '--test-dir', "" + Neat.root + "/test/spec"];
      return run(JASMINE, args, callback);
    };
  };

}