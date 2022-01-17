function(fn, inScope, ancestry) {
      var child, childName, _i, _len, _ref1;
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
      _ref1 = this.childNodes;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        childName = _ref1[_i];
        child = this[childName];
        if (child != null) {
          while (child !== (child = (fn.call(child, inScope, ancestry)).walk(fn, inScope, ancestry))) {
            continue;
          }
          inScope = union(inScope, child != null ? child.envEnrichments() : void 0);
          this[childName] = child;
        }
        child;

      }
      ancestry.shift();
      return fn.call(this, inScope, ancestry);
    }