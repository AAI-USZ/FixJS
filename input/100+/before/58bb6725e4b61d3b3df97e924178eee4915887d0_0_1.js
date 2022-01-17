function(text) {
    var completions, free, keywords, possibilities, r, vars, _ref;
    free = (_ref = text.match(SIMPLEVAR)) != null ? _ref[1] : void 0;
    if (text === "") free = "";
    if (free != null) {
      vars = Script.runInThisContext('Object.getOwnPropertyNames(Object(this))');
      keywords = (function() {
        var _i, _len, _ref2, _results;
        _ref2 = CoffeeScript.RESERVED;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          r = _ref2[_i];
          if (r.slice(0, 2) !== '__') _results.push(r);
        }
        return _results;
      })();
      possibilities = vars.concat(keywords);
      completions = getCompletions(free, possibilities);
      return [completions, free];
    }
  }