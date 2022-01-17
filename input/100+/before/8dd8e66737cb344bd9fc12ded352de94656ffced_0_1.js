function(fieldIndex, nans, filterFunc) {
    var newFilterFunc, rawData;
    if (nans == null) {
      nans = false;
    }
    if (filterFunc == null) {
      filterFunc = (function(dp) {
        return true;
      });
    }
    newFilterFunc = nans ? filterFunc : function(dp) {
      return (filterFunc(dp)) && (!isNaN(dp[fieldIndex])) && (dp[fieldIndex] !== null);
    };
    rawData = data.dataPoints.filter(newFilterFunc);
    return rawData.map(function(dp) {
      return dp[fieldIndex];
    });
  }