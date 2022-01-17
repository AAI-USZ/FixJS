function(fn, inScope, ancestry) {
      var key, val;
      if (inScope == null) {
        inScope = [];
      }
      if (ancestry == null) {
        ancestry = [];
      }
      ancestry = [this].concat(__slice.call(ancestry));
      this.members = (function() {
        var _i, _len, _ref1, _ref2, _results;
        _ref1 = this.members;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          _ref2 = _ref1[_i], key = _ref2[0], val = _ref2[1];
          while (val !== (val = (fn.call(val, inScope, ancestry)).walk(fn, inScope, ancestry))) {
            continue;
          }
          inScope = union(inScope, val.envEnrichments());
          _results.push([key, val]);
        }
        return _results;
      }).call(this);
      return this;
    }