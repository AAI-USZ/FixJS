function() {
  var Neat, describe, ensurePathSync, error, fs, initializer, missing, namespace, notOutsideNeat, puts, render, resolve, usages, utils, _ref, _ref1,
    __slice = [].slice;

  fs = require('fs');

  resolve = require('path').resolve;

  Neat = require('../neat');

  utils = resolve(Neat.neatRoot, "lib/utils");

  ensurePathSync = require(resolve(utils, "files")).ensurePathSync;

  namespace = require(resolve(utils, "exports")).namespace;

  _ref = require(resolve(utils, "commands")), describe = _ref.describe, usages = _ref.usages;

  render = require(resolve(utils, "templates")).render;

  _ref1 = require(resolve(utils, "logs")), puts = _ref1.puts, error = _ref1.error, missing = _ref1.missing, notOutsideNeat = _ref1.notOutsideNeat;

  usages('neat generate initializer [name]', describe('Generates a [name] initializer in the config/initializers directory', initializer = function() {
    var a, args, cb, generator, name, _i;
    generator = arguments[0], name = arguments[1], args = 4 <= arguments.length ? __slice.call(arguments, 2, _i = arguments.length - 1) : (_i = 2, []), cb = arguments[_i++];
    if (Neat.root == null) {
      return puts(notOutsideNeat("neat generate initializer"));
    }
    if (name == null) {
      return puts(error("Missing name argument"));
    }
    a = name.split('/');
    name = a.pop();
    return render(__filename, {
      name: name
    }, function(err, data) {
      var dir, path;
      if (err != null) {
        return "" + (missing("Template for " + __filename)) + "\n\n" + err.stack;
      }
      dir = resolve(Neat.root, "src/config/initializers/" + (a.join('/')));
      ensurePathSync(dir);
      path = resolve(dir, "" + name + ".coffee");
      return fs.writeFile(path, data, function(err) {
        if (err) {
          return puts(error("" + ("Can't write " + path).red + "\n\n" + err.stack)) && (typeof cb === "function" ? cb() : void 0);
        }
        puts(("" + dir + "/" + name + ".coffee generated").green);
        return typeof cb === "function" ? cb() : void 0;
      });
    });
  }));

  module.exports = {
    initializer: initializer
  };

}