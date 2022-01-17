function(color, keys, obj) {
    var key, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = keys.length; _i < _len; _i++) {
      key = keys[_i];
      _results.push(this.label(color, key, obj[key]));
    }
    return _results;
  }