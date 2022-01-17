function() {
  var Neat, aliases, describe, error, fs, info, install, missing, neatBroken, puts, render, resolve, run, utils, warn, _ref, _ref1;

  fs = require('fs');

  resolve = require('path').resolve;

  Neat = require('../neat');

  utils = resolve(Neat.neatRoot, "lib/utils");

  _ref = require(resolve(utils, "logs")), puts = _ref.puts, error = _ref.error, info = _ref.info, warn = _ref.warn, missing = _ref.missing, neatBroken = _ref.neatBroken;

  _ref1 = require(resolve(utils, "commands")), run = _ref1.run, aliases = _ref1.aliases, describe = _ref1.describe;

  render = require(resolve(utils, "templates")).render;

  install = function(pr) {
    var f;
    if (pr == null) {
      return error("No program provided to install");
    }
    return aliases('i', 'install', describe('Installs all the dependencies listed in the `Nemfile`', f = function(cb) {
      if (Neat.root == null) {
        return error("Can't run neat install outside of a Neat project.");
      }
      return fs.readFile('Nemfile', function(err, nemfile) {
        if (err) {
          return error("No " + "Nemfile".red + " in the current directory");
        }
        puts("Nemfile found");
        return render(__filename, function(err, source) {
          if (err != null) {
            return error(err.message);
          }
          source = source.replace("###_NPM_DECLARATION_###", nemfile.toString());
          return run('coffee', ['-e', source], function() {
            info("Your bundle is complete.".green);
            return typeof cb === "function" ? cb() : void 0;
          });
        });
      });
    }));
  };

  module.exports = {
    install: install
  };

}