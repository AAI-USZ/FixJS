function() {
      var all_inputs, f, logger, options, output, urlpath, _fn, _fn2, _i, _j, _len, _len2, _ref, _ref2, _ref3,
        _this = this;
      this.build(false);
      logger = this.logger;
      _ref = this.options.js;
      for (urlpath in _ref) {
        options = _ref[urlpath];
        all_inputs = [].concat(options.lib, options.module);
        _fn = function(buildConfig, fileToWatch) {
          return fs.watch(fileToWatch, function(e, f) {
            logger.debug("File changed: " + f + ", rebuilding " + buildConfig.build);
            return fs.writeFileSync(buildConfig.build, js.createPackage(buildConfig).compile());
          });
        };
        for (_i = 0, _len = all_inputs.length; _i < _len; _i++) {
          f = all_inputs[_i];
          f = path.resolve(f);
          if (!fs.existsSync(f)) continue;
          _fn(options, f);
        }
      }
      _ref2 = this.options.css;
      for (urlpath in _ref2) {
        options = _ref2[urlpath];
        _ref3 = options.input;
        _fn2 = function(buildConfig, fileToWatch) {
          return fs.watch(fileToWatch, function(e, f) {
            logger.debug("File changed: " + f + ", rebuilding " + buildConfig.build);
            return fs.writeFileSync(buildConfig.build, css.createPackage(buildConfig).compile());
          });
        };
        for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
          f = _ref3[_j];
          path.resolve(f);
          if (!fs.existsSync(f)) continue;
          _fn2(options, f);
        }
        output = options.build != null ? path.resolve(options.build) : path.join(this.options.docroot, urlpath);
        fs.writeFileSync(output, css.createPackage(options).compile());
      }
      return this.logger.info("Watching for changes...");
    }