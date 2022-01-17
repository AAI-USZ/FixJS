function(fieldIndex, filterFunc) {
    var mid, rawData;
    if (filterFunc == null) {
      filterFunc = function(dp) {
        return true;
      };
    }
    rawData = data.selector(fieldIndex, filterFunc);
    rawData.sort();
    mid = Math.floor(rawData.length / 2);
    if (rawData.length % 2) {
      return rawData[mid];
    } else {
      return (rawData[mid - 1] + rawData[mid]) / 2.0;
    }
  }