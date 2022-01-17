function(xIndex, yIndex, filterFunc) {
    var mapFunc, mapped, rawData;
    if (filterFunc == null) {
      filterFunc = (function(dp) {
        return true;
      });
    }
    rawData = this.dataPoints.filter(filterFunc);
    mapFunc = function(dp) {
      var obj;
      return obj = {
        x: dp[xIndex],
        y: dp[yIndex],
        name: "Temp"
      };
    };
    mapped = rawData.map(mapFunc);
    mapped.sort(function(a, b) {
      return a.x - b.x;
    });
    return mapped;
  }