function(fn, inScope, ancestry) {
      var block, cond, conds;
      if (inScope == null) {
        inScope = [];
      }
      if (ancestry == null) {
        ancestry = [];
      }
      if (__indexOf.call(ancestry, this) >= 0) {
        return this;
      }
      ancestry = [this].concat(__slice.call(ancestry));
      if (this.expr != null) {
        while (this.expr !== (this.expr = (fn.call(this.expr, inScope, ancestry)).walk(fn, inScope, ancestry))) {
          continue;
        }
        inScope = union(inScope, this.expr.envEnrichments());
      }
      this.cases = (function() {
        var _i, _len, _ref1, _ref2, _results;
        _ref1 = this.cases;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          _ref2 = _ref1[_i], conds = _ref2[0], block = _ref2[1];
          conds = (function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len1 = conds.length; _j < _len1; _j++) {
              cond = conds[_j];
              while (cond !== (cond = (fn.call(cond, inScope, ancestry)).walk(fn, inScope, ancestry))) {
                continue;
              }
              inScope = union(inScope, cond.envEnrichments());
              _results1.push(cond);
            }
            return _results1;
          })();
          while (block !== (block = (fn.call(block, inScope, ancestry)).walk(fn, inScope, ancestry))) {
            continue;
          }
          inScope = union(inScope, block.envEnrichments());
          _results.push([conds, block]);
        }
        return _results;
      }).call(this);
      if (typeof elseBlock !== "undefined" && elseBlock !== null) {
        while (this.elseBlock !== (this.elseBlock = (fn.call(this.elseBlock, inScope, ancestry)).walk(fn, inScope, ancestry))) {
          continue;
        }
      }
      ancestry.shift();
      return fn.call(this, inScope, ancestry);
    }