function(fn, inScope, ancestry) {
      var arg;
      if (inScope == null) {
        inScope = [];
      }
      if (ancestry == null) {
        ancestry = [];
      }
      ancestry.push(this);
      while (this["function"] !== (this["function"] = (fn.call(this["function"], inScope, ancestry)).walk(fn, inScope, ancestry))) {
        continue;
      }
      inScope = union(inScope, this["function"].envEnrichments());
      this["arguments"] = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this["arguments"];
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          arg = _ref1[_i];
          while (arg !== (arg = (fn.call(arg, inScope, ancestry)).walk(fn, inScope, ancestry))) {
            continue;
          }
          inScope = union(inScope, arg.envEnrichments());
          _results.push(arg);
        }
        return _results;
      }).call(this);
      return this;
    }