function(string) {
    var j, matches, _i, _len, _ref, _results;
    matches = (_ref = string.split(parsePattern)) != null ? _ref : [];
    _results = [];
    for (_i = 0, _len = matches.length; _i < _len; _i++) {
      j = matches[_i];
      _results.push([_ref[_i + 1], _ref[(_i += 2) + 1]]);
    }
    return _results;
  }