function Code(main, vars, err, global, debug, method, unmemoized) {
      var _ref, _ref2, _ref3, _ref4;
      this.main = main;
      this.vars = vars;
      this.err = err;
      this.global = global;
      this.debug = debug;
      this.method = method;
      this.unmemoized = unmemoized;
      this.main = (_ref = this.main) != null ? _ref : '';
      this.vars = (_ref2 = this.vars) != null ? _ref2 : Nil;
      this.err = (_ref3 = this.err) != null ? _ref3 : '';
      this.global = (_ref4 = this.global) != null ? _ref4 : Nil;
    }