function() {
      var arg, args, c_template, fn, ls, transformed;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      fn = new C.Lambda({
        body: this.template,
        args: this.argnames
      }, this.yy);
      args = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = args.length; _i < _len; _i++) {
          arg = args[_i];
          arg = arg.clone();
          arg.quoted = true;
          _results.push(arg);
        }
        return _results;
      })();
      ls = new C.List([fn].concat(__slice.call(args)), this.yy);
      c_template = ls.compile();
      transformed = eval(c_template);
      if (transformed instanceof C.List) {
        transformed.quoted = false;
      }
      return transformed;
    }