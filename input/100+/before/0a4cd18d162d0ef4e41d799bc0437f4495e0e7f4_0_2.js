function(fn, inScope, ancestry) {
      var param;
      if (inScope == null) {
        inScope = [];
      }
      if (ancestry == null) {
        ancestry = [];
      }
      ancestry = [this].concat(__slice.call(ancestry));
      this.parameters = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this.parameters;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          param = _ref1[_i];
          while (param !== (param = (fn.call(param, inScope, ancestry)).walk(fn, inScope, ancestry))) {
            continue;
          }
          inScope = union(inScope, param.envEnrichments());
          _results.push(param);
        }
        return _results;
      }).call(this);
      while (this.block !== (this.block = (fn.call(this.block, inScope, ancestry)).walk(fn, inScope, ancestry))) {
        continue;
      }
      return this;
    }