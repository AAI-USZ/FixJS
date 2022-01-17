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
    rawData = this.dataPoints.filter(newFilterFunc);
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
    rawData = this.selector(fieldIndex, false, filterFunc);
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
    rawData = this.selector(fieldIndex, false, filterFunc);
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
    rawData = this.selector(fieldIndex, false, filterFunc);
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
    rawData = this.selector(fieldIndex, false, filterFunc);
    rawData.sort();
    mid = Math.floor(rawData.length / 2);
    if (rawData.length % 2) {
      return rawData[mid];
    } else {
      return (rawData[mid - 1] + rawData[mid]) / 2.0;
    }
  };

  /*
  Gets a list of unique, non-null, stringified vals from the given field index.
  All included datapoints must pass the given filter (defaults to all datapoints).
  */


  data.getUnique = function(fieldIndex, filterFunc) {
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
  };

  /*
  Gets a list of text field indicies
  */


  data.getTextFields = function() {
    var fieldIndex;
    return ((function() {
      var _results;
      _results = [];
      for (fieldIndex in this.fields) {
        _results.push(fieldIndex);
      }
      return _results;
    }).call(this)).filter((function(fi) {
      return this.fields[fi].typeID === 37;
    }), this);
  };

}