function(value) {
      var cnt, ignore, val, _ref, _results;
      cell[0] = true;
      cell[1] = value;
      _results = [];
      while (eventCont.length && eventCont[0][0]) {
        _ref = eventCont.shift(), ignore = _ref[0], val = _ref[1], cnt = _ref[2];
        _results.push(cnt(val));
      }
      return _results;
    }