function(k, c) {
    var alias, _i, _len, _ref1, _results;
    if (c.aliases == null) {
      return print(("Can't register command " + k + " due to missing aliases\n").red);
    }
    _ref1 = c.aliases;
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      alias = _ref1[_i];
      pr.command(alias).description(c.description).action(c);
      _results.push(cmdMap[k] = c);
    }
    return _results;
  }