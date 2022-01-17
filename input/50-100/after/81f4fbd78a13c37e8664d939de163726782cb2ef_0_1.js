function() {
    var _ref, _results;
    _ref = data.fields;
    _results = [];
    for (index in _ref) {
      field = _ref[index];
      if ((Number(field.typeID)) === 37) {
        _results.push(Number(index));
      }
    }
    return _results;
  }