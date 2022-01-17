function() {

  data.selector = function(fieldIndex, nans, filterFunc) {
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
  };

  /*
  Gets the maximum (numeric) value for the given field index.
  All included datapoints must pass the given filter (defaults to all datapoints).
  */


  data.getMax = function(fieldIndex, filterFunc) {
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
  };

  /*
  Gets the minimum (numeric) value for the given field index.
  All included datapoints must pass the given filter (defaults to all datapoints).
  */


  data.getMin = function(fieldIndex, filterFunc) {
    var rawData;
    if (filterFunc == null) {
      filterFunc = function(dp) {
        return true;
      };
    }
    rawData = data.selector(fieldIndex, filterFunc);
    return rawData.reduce(function(a, b) {
      return Math.min(a, b);
    });
  };

  /*
  Gets the mean (numeric) value for the given field index.
  All included datapoints must pass the given filter (defaults to all datapoints).
  */


  data.getMean = function(fieldIndex, filterFunc) {
    var rawData;
    if (filterFunc == null) {
      filterFunc = function(dp) {
        return true;
      };
    }
    rawData = data.selector(fieldIndex, filterFunc);
    return (rawData.reduce(function(a, b) {
      return a + b;
    })) / rawData.length;
  };

  /*
  Gets the median (numeric) value for the given field index.
  All included datapoints must pass the given filter (defaults to all datapoints).
  */


  data.getMedian = function(fieldIndex, filterFunc) {
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
  };

}