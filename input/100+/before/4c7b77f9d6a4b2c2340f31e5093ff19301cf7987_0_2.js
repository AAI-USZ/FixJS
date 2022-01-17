function(rows) {
  var item, queue, results, state, _i, _len, _ref1, _ref2;
  results = {};
  for (_i = 0, _len = rows.length; _i < _len; _i++) {
    item = rows[_i];
    _ref1 = item.key.split('-'), queue = _ref1[0], state = _ref1[1];
    if ((_ref2 = results[queue]) == null) {
      results[queue] = {};
    }
    results[queue][state] = item.value;
  }
  return results;
}