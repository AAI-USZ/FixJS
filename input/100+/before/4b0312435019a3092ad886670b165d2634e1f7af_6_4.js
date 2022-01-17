function() {
  var Neat, aliases, describe, error, findSiblingFile, fs, install, missing, neatBroken, puts, render, resolve, run, utils, warn, _ref, _ref1;

  fs = require('fs');

  resolve = require('path').resolve;

  Neat = require('../neat');

  utils = resolve(Neat.neatRoot, "lib/utils");

  findSiblingFile = require(resolve(utils, "files")).findSiblingFile;

  _ref = require(resolve(utils, "logs")), puts = _ref.puts, error = _ref.error, warn = _ref.warn, missing = _ref.missing, neatBroken = _ref.neatBroken;

  _ref1 = require(resolve(utils, "commands")), run = _ref1.run, aliases = _ref1.aliases, describe = _ref1.describe;

  render = require(resolve(utils, "templates")).render;

  install = function(pr) {
    var f;
    if (pr == null) {
      return puts(error("No program provided to install"));
    }
    return aliases('i', 'install', describe('Installs all the dependencies listed in the `Nemfile`', f = function(cb) {
      if (Neat.root == null) {
        return puts(error("Can't run neat install outside of a Neat project."));
      }
      return fs.readFile('Nemfile', function(err, nemfile) {
        if (err) {
          return puts(error("No " + "Nemfile".red + " in the current directory"));
        }
        if (Neat.env.verbose) {
          puts("Nemfile found");
        }
        return render(__filename, function(err, source) {
          if (err != null) {
            return puts(error(err.message));
          }
          source = source.replace("###_NPM_DECLARATION_###", nemfile.toString());
          return run('coffee', ['-e', source], function() {
            puts("Your bundle is complete.".info);
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