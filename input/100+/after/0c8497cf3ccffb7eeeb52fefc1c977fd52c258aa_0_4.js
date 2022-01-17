function(fn, inScope, ancestry) {
      var statement;
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
      this.statements = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this.statements;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          statement = _ref1[_i];
          while (statement !== (statement = (fn.call(statement, inScope, ancestry)).walk(fn, inScope, ancestry))) {
            continue;
          }
          inScope = union(inScope, statement.envEnrichments());
          _results.push(statement);
        }
        return _results;
      }).call(this);
      ancestry.shift();
      return fn.call(this, inScope, ancestry);
    }