function() {
      var m, modules, modulesDir, _i, _len, _ref3;
      modulesDir = resolve(this.root, 'node_modules');
      if (exists(modulesDir)) {
        modules = fs.readdirSync(modulesDir);
        modules = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = modules.length; _i < _len; _i++) {
            m = modules[_i];
            if (m !== 'neat') {
              _results.push(resolve(modulesDir, m));
            }
          }
          return _results;
        })();
        for (_i = 0, _len = modules.length; _i < _len; _i++) {
          m = modules[_i];
          if (isNeatRootSync(m)) {
            this.paths.push(m);
          }
        }
      } else {
        puts(warn('No node modules found, run neat install.'));
      }
      if (_ref3 = this.root, __indexOf.call(this.paths, _ref3) < 0) {
        return this.paths.push(this.root);
      }
    }