function(fieldIndex, filterFunc) {
    var dat, keys, rawData, result, _i, _len, _results;
    if (filterFunc == null) {
      filterFunc = function(dp) {
        return true;
      };
    }
    rawData = this.selector(fieldIndex, true, function(dp) {
      return (filterFunc(dp)) && dp[fieldIndex] !== null;
    });
    result = {};
    for (_i = 0, _len = rawData.length; _i < _len; _i++) {
      dat = rawData[_i];
      result[String(dat).toLowerCase()] = true;
    }
    _results = [];
    for (keys in result) {
      _results.push(keys);
    }
    return _results;
  }