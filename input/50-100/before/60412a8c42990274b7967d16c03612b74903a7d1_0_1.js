function(aliases, fn) {
    var alias, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = aliases.length; _i < _len; _i++) {
      alias = aliases[_i];
      _results.push(modules[alias] = fn);
    }
    return _results;
  }