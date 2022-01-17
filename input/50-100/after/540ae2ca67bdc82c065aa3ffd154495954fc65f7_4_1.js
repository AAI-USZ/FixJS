function(klen) {
    var i, max, _i, _results;
    max = Math.pow(10, klen);
    _results = [];
    for (i = _i = 0; 0 <= max ? _i < max : _i > max; i = 0 <= max ? ++_i : --_i) {
      _results.push(padKey("" + i, klen));
    }
    return _results;
  }