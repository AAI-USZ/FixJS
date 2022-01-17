function(env) {
      var configurator, configurators, envObject, f, files, initialize, initializer, initializers, paths, setup, _i, _j, _k, _len, _len1, _len2,
        _this = this;
      envObject = {
        root: this.root,
        neatRoot: this.neatRoot,
        paths: this.paths,
        initPath: this.initPath,
        envPath: this.envPath,
        ROOT: this.ROOT,
        NEAT_ROOT: this.NEAT_ROOT,
        PATHS: this.PATHS,
        INIT_PATH: this.INIT_PATH,
        ENV_PATH: this.ENV_PATH,
        verbose: false
      };
      paths = this.paths.map(function(p) {
        return "" + p + "/" + _this.envPath;
      });
      configurators = findSync(/^default$/, 'js', paths);
      if (!((configurators != null) && configurators.length !== 0)) {
        return error("" + (missing('config/environments/default.js')) + "\n\n" + neatBroken);
      }
      files = findSync(RegExp("^" + env + "$"), "js", paths);
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        f = files[_i];
        if (__indexOf.call(configurators, f) < 0) {
          configurators.push(f);
        }
      }
      for (_j = 0, _len1 = configurators.length; _j < _len1; _j++) {
        configurator = configurators[_j];
        puts("Running " + configurator);
        try {
          setup = require(configurator);
          if (typeof setup === "function") {
            setup(envObject);
          }
        } catch (e) {
          error("" + 'Something went wrong with a configurator!!!'.red + "\n\n" + e.stack);
        }
      }
      initializers = findSync('js', this.paths.map(function(o) {
        return "" + o + "/" + _this.initPath;
      }));
      for (_k = 0, _len2 = initializers.length; _k < _len2; _k++) {
        initializer = initializers[_k];
        try {
          initialize = require(initializer);
          if (typeof initialize === "function") {
            initialize(envObject);
          }
        } catch (e) {
          error("" + 'Something went wrong with an initializer!!!'.red + "\n\n" + e.stack);
        }
      }
      return this.ENV = this.env = envObject;
    }