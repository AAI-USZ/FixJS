function(fn, inScope, ancestry) {
      var member;
      if (inScope == null) {
        inScope = [];
      }
      if (ancestry == null) {
        ancestry = [];
      }
      ancestry.push(this);
      this.members = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this.members;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          member = _ref1[_i];
          while (member !== (member = (fn.call(member, inScope, ancestry)).walk(fn, inScope, ancestry))) {
            continue;
          }
          inScope = union(inScope, member.envEnrichments());
          _results.push(member);
        }
        return _results;
      }).call(this);
      return this;
    }