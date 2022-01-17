function(rows) {
  var item, queue, results, state, _i, _len, _ref2, _ref3, _ref4;
  results = {};
  _ref2 = rows || [];
  for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
    item = _ref2[_i];
    _ref3 = item.key.split('-'), queue = _ref3[0], state = _ref3[1];
    if ((_ref4 = results[queue]) == null) results[queue] = {};
    results[queue][state] = item.value;
  }
  return results;
}