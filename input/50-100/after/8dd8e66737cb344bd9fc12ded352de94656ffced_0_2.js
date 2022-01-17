function(fieldIndex, filterFunc) {
    var rawData;
    if (filterFunc == null) {
      filterFunc = function(dp) {
        return true;
      };
    }
    rawData = this.selector(fieldIndex, false, filterFunc);
    return (rawData.reduce(function(a, b) {
      return a + b;
    })) / rawData.length;
  }