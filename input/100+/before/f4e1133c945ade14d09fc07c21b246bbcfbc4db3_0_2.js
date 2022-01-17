function defToken(name) {
      var i, types;
      if (!(this.tokens[name] != null)) {
        this.tokens[name] = 1;
        this.tokenTypes.push(name);
        this.tokenTypes.sort(function(a, b) {
          return b.length - a.length;
        });
        types = (function() {
          var _i, _len, _ref, _results;
          _ref = this.tokenTypes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            _results.push(escapeRegexpChars(i));
          }
          return _results;
        }).call(this);
        return this.tokenPat = new RegExp("\\n *|" + (types.join('|')) + "|" + baseTokenPat.source);
      }
    }