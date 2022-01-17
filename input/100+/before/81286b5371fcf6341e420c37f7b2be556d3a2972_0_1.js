function BeJS(doMonkeyPatch, verbose) {
      var clazz, _i, _len, _ref;
      if (doMonkeyPatch == null) {
        doMonkeyPatch = false;
      }
      if (verbose == null) {
        verbose = false;
      }
      if (doMonkeyPatch) {
        _ref = [String, Number];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          clazz = _ref[_i];
          this.monkeyPatch(clazz);
        }
      }
      this.environment = 'browser';
      BeJS.quiet = !verbose;
      this.environment = (typeof process !== "undefined" && process !== null) && process.title === 'node' ? 'node' : 'browser';
    }