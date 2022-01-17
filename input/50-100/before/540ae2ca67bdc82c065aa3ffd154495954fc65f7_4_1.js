function(klen) {
    var i, max, _results;
    max = Math.pow(10, klen);
    _results = [];
    for (i = 0; 0 <= max ? i < max : i > max; 0 <= max ? i++ : i--) {
      _results.push(padKey("" + i, klen));
    }
    return _results;
  }