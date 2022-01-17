function(xIndex, yIndex, gIndex) {
    var mapFunc, mapped, rawData,
      _this = this;
    rawData = this.dataPoints.filter(function(dp) {
      return (String(dp[_this.groupIndex])).toLowerCase() === _this.groups[gIndex];
    });
    if ((Number(this.fields[xIndex].typeID)) === 7) {
      mapFunc = function(dp) {
        var obj;
        return obj = {
          x: new Date(dp[xIndex]),
          y: dp[yIndex],
          name: "Temp"
        };
      };
    } else {
      mapFunc = function(dp) {
        var obj;
        return obj = {
          x: dp[xIndex],
          y: dp[yIndex],
          name: "Temp"
        };
      };
    }
    mapped = rawData.map(mapFunc);
    mapped.sort(function(a, b) {
      return a.x - b.x;
    });
    return mapped;
  }