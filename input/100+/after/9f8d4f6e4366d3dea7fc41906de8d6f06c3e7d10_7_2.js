function defToken(name) {
    var i, types;
    if (!(tokens[name] != null)) {
      tokens[name] = 1;
      tokenTypes.push(name);
      tokenTypes.sort(function(a, b) {
        return b.length - a.length;
      });
      types = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = tokenTypes.length; _i < _len; _i++) {
          i = tokenTypes[_i];
          _results.push(escapeRegexpChars(i));
        }
        return _results;
      })();
      return tokenPat = new RegExp("\\n *|" + (types.join('|')) + "|" + baseTokenPat.source);
    }
  }