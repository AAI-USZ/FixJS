function(err, source) {
          var a, bin, binaries, dependencies, g, hasLibIndex, hasSrcIndex, p, pkgfile, _j, _k, _l, _len, _len1, _len2, _ref2, _ref3;
          if (err != null) {
            return error(err.message);
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
              return error(err.message);
            }
            info("package.json generated".green);
            return typeof cb === "function" ? cb() : void 0;
          });
        }