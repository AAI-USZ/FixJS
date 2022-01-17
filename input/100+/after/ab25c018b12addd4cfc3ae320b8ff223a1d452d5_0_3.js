function() {
  var JASMINE, Neat, error, path, red, run, yellow, _ref;

  path = require('path');

  Neat = require('../../../neat');

  run = require('../../../utils/commands').run;

  _ref = require('../../../utils/logs'), error = _ref.error, red = _ref.red, yellow = _ref.yellow;

  JASMINE = "" + Neat.root + "/node_modules/.bin/jasmine-node";

  module.exports = function(config) {
    return config.engines.tests.jasmine = function(callback) {
      var args;
      if (!path.existsSync(JASMINE)) {
        error("" + (red("Can't find jasmine-node module")) + "\n\nRun " + (yellow('neat install')) + " to install the dependencies.");
        return typeof callback === "function" ? callback() : void 0;
      }
      args = ['.', '--color', '--coffee', '--test-dir', "" + Neat.root + "/test/spec"];
      return run(JASMINE, args, function(status) {
        return typeof callback === "function" ? callback() : void 0;
      });
    };
  };

}