function() {
  var field, index;

  data.xySelector = function(xIndex, yIndex, filterFunc) {
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
  };

  /*
  Selects an array of data from the given field index.
  if 'nans' is true then datapoints with NaN values in the given field will be included.
  'filterFunc' is a boolean filter that must be passed (true) for a datapoint to be included.
  */


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


  data.textFields = (function() {
    var _ref, _results;
    _ref = data.fields;
    _results = [];
    for (index in _ref) {
      field = _ref[index];
      if ((Number(field.typeID)) === 37) {
        _results.push(Number(index));
      }
    }
    return _results;
  })();

  /*
  Gets a list of time field indicies
  */


  data.timeFields = (function() {
    var _ref, _results;
    _ref = data.fields;
    _results = [];
    for (index in _ref) {
      field = _ref[index];
      if ((Number(field.typeID)) === 7) {
        _results.push(Number(index));
      }
    }
    return _results;
  })();

  /*
  Gets a list of non-text, non-time field indicies
  */


  data.normalFields = (function() {
    var _ref, _ref1, _results;
    _ref = data.fields;
    _results = [];
    for (index in _ref) {
      field = _ref[index];
      if ((_ref1 = Number(field.typeID)) !== 37 && _ref1 !== 7) {
        _results.push(Number(index));
      }
    }
    return _results;
  })();

  /*
  Gets a list of non-text field indicies
  */


  data.numericFields = (function() {
    var _ref, _ref1, _results;
    _ref = data.fields;
    _results = [];
    for (index in _ref) {
      field = _ref[index];
      if ((_ref1 = Number(field.typeID)) !== 37) {
        _results.push(Number(index));
      }
    }
    return _results;
  })();

}