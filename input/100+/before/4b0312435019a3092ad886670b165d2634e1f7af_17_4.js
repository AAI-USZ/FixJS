function() {
  var Neat, cup, describe, dirWithIndexSync, error, exists, fs, index, namespace, puts, render, resolve, utils, _ref, _ref1,
    __slice = [].slice;

  fs = require("fs");

  _ref = require('path'), resolve = _ref.resolve, exists = _ref.existsSync;

  Neat = require('../neat');

  utils = resolve(Neat.neatRoot, "lib/utils");

  namespace = require(resolve(utils, "exports")).namespace;

  describe = require(resolve(utils, "commands")).describe;

  _ref1 = require(resolve(utils, "logs")), puts = _ref1.puts, error = _ref1.error;

  render = require(resolve(utils, "templates")).render;

  dirWithIndexSync = require(resolve(utils, "files")).dirWithIndexSync;

  cup = require(resolve(utils, "cup"));

  describe('Generates the package.json file', index = function() {
    var args, cb, generator, pkg, _i;
    generator = arguments[0], args = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), cb = arguments[_i++];
    if (Neat.root == null) {
      return puts(error("Can't run package generator outside of a Neat project."));
    }
    pkg = {};
    return fs.readFile(resolve(Neat.root, ".neat"), function(err, meta) {
      var k, v;
      meta = cup.read(meta);
      for (k in meta) {
        v = meta[k];
        pkg[k] = v;
      }
      return fs.readFile('Nemfile', function(err, nemfile) {
        var context, path;
        if (err) {
          return puts(warn("No " + "Nemfile".red + " in the current directory"));
        }
        if (Neat.env.verbose) {
          puts("Nemfile found");
        }
        path = resolve(__dirname, "package/dependencies");
        context = {
          npm: nemfile.toString().replace(/^(.|$)/gm, "  $1")
        };
        return render(path, context, function(err, source) {
          var a, bin, binaries, dependencies, g, hasLibIndex, hasSrcIndex, p, pkgfile, _j, _k, _l, _len, _len1, _len2, _ref2, _ref3;
          if (err != null) {
            return puts(error(err.message));
          }
          dependencies = cup.read(source);
          if (dependencies == null) {
            return;
          }
          pkg.dependencies = {};
          pkg.devDependencies = {};
          for (g in dependencies) {
            a = dependencies[g];
            if (g === "default" || g === "production") {
              for (_j = 0, _len = a.length; _j < _len; _j++) {
                _ref2 = a[_j], p = _ref2[0], v = _ref2[1];
                pkg.dependencies[p] = v || "*";
              }
            } else {
              for (_k = 0, _len1 = a.length; _k < _len1; _k++) {
                _ref3 = a[_k], p = _ref3[0], v = _ref3[1];
                pkg.devDependencies[p] = v || "*";
              }
            }
          }
          hasLibIndex = dirWithIndexSync(resolve(Neat.root, "lib"));
          hasSrcIndex = dirWithIndexSync(resolve(Neat.root, "src"));
          if (hasLibIndex || hasSrcIndex) {
            pkg.main = './lib/index';
          }
          if (exists(resolve(Neat.root, "bin"))) {
            binaries = fs.readdirSync(resolve(Neat.root, "bin"));
            if (binaries != null) {
              pkg.bin = {};
              for (_l = 0, _len2 = binaries.length; _l < _len2; _l++) {
                bin = binaries[_l];
                pkg.bin[bin] = "./bin/" + bin;
              }
            }
          }
          pkgfile = resolve(Neat.root, "package.json");
          return fs.writeFile(pkgfile, JSON.stringify(pkg, null, 2), function(err) {
            if (err != null) {
              return puts(error(err.message));
            }
            puts("package.json generated".green);
            return typeof cb === "function" ? cb() : void 0;
          });
        });
      });
    });
  });

  module.exports = namespace("package", {
    index: index
  });

}