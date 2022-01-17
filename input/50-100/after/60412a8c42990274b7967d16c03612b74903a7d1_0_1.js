function(aliases, fn) {
    var alias, _i, _len;
    for (_i = 0, _len = aliases.length; _i < _len; _i++) {
      alias = aliases[_i];
      modules[alias] = fn;
    }
  }