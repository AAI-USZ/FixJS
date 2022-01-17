function() {
  var Neat, aliases, describe, error, fs, green, info, install, puts, red, render, resolve, run, utils, _ref, _ref1;

  fs = require('fs');

  resolve = require('path').resolve;

  Neat = require('../neat');

  utils = resolve(Neat.neatRoot, "lib/utils");

  _ref = require("../utils/logs"), puts = _ref.puts, error = _ref.error, info = _ref.info, green = _ref.green, red = _ref.red;

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
          return run('coffee', ['-e', source], function(status) {
            if (status === 0) {
              info(green("Your bundle is complete."));
            } else {
              error(red("An error occured during the installation!"));
            }
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