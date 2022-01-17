function(fieldIndex, filterFunc) {
    var rawData;
    if (filterFunc == null) {
      filterFunc = function(dp) {
        return true;
      };
    }
    rawData = data.selector(fieldIndex, filterFunc);
    return rawData.reduce(function(a, b) {
      return Math.max(a, b);
    });
  }