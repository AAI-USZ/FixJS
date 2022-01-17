function() {
  var Data, async, descend, ensure, mapArray, mapData, mapObject,
    __slice = [].slice;

  async = require('async');

  descend = function(currentPath, object, mapFun, cb) {
    var eachMap;
    switch (object.constructor) {
      case Array:
        eachMap = function(each, index, cb) {
          return mapData(currentPath.concat([index]), each, mapFun, cb);
        };
        return mapArray(object, eachMap, cb);
      case Object:
        eachMap = function(key, value, cb) {
          return mapData(currentPath.concat([key]), value, mapFun, cb);
        };
        return mapObject(object, eachMap, cb);
      default:
        return cb(null, object);
    }
  };

  mapData = function(currentPath, object, mapFun, cb) {
    return mapFun(currentPath, object, function(err, result) {
      if (result) {
        return cb(err, result);
      } else {
        return descend(currentPath, object, mapFun, function(err, res) {
          return cb(err, res);
        });
      }
    });
  };

  mapArray = function(array, mapFun, cb) {
    var mapWrapper, newArray, _i, _ref, _results;
    newArray = [];
    mapWrapper = function(index, cb) {
      return mapFun(array[index], index, function(err, res) {
        newArray[index] = res;
        return cb();
      });
    };
    return async.forEach((function() {
      _results = [];
      for (var _i = 0, _ref = array.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this), mapWrapper, function() {
      return cb(null, newArray);
    });
  };

  mapObject = function(object, mapFun, cb) {
    var key, map, newObj, tasks, value;
    newObj = {};
    map = function(key, value) {
      return function(cb) {
        return mapFun(key, value, function(err, res) {
          newObj[key] = res;
          return cb();
        });
      };
    };
    tasks = (function() {
      var _results;
      _results = [];
      for (key in object) {
        value = object[key];
        _results.push(map(key, value));
      }
      return _results;
    })();
    return async.parallel(tasks, function() {
      return cb(null, newObj);
    });
  };

  ensure = function() {
    var cb, map, values, _i;
    values = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), cb = arguments[_i++];
    map = function(value, cb) {
      switch (value.length) {
        case void 0:
          return cb(null, value);
        case 0:
          return cb(null, value());
        case 1:
          return value(cb);
      }
    };
    return async.map(values, map, function(err, res) {
      return cb.apply(null, [null].concat(__slice.call(res)));
    });
  };

  Data = (function() {

    function Data(requiredData, dataFun) {
      var data, _ref;
      _ref = dataFun ? [requiredData, dataFun] : [[], requiredData], this.requiredData = _ref[0], this.dataFun = _ref[1];
      this.requiredData = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this.requiredData;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          data = _ref1[_i];
          if (data.constructor === Data) {
            _results.push(data);
          } else {
            _results.push(new Data(data));
          }
        }
        return _results;
      }).call(this);
    }

    Data.prototype.value = function(cb) {
      var dataFun, finished, mapFun, that;
      if (this.dataCached) {
        return cb(null, this.dataCached);
      }
      dataFun = this.dataFun;
      that = this;
      finished = function(err, result) {
        if (result.constructor === Data) {
          return result.value(finished);
        } else {
          that.dataCached = result;
          return cb(err, result);
        }
      };
      if (typeof dataFun !== 'function') {
        return finished(null, dataFun);
      } else if (dataFun.length === 0) {
        return finished(null, dataFun());
      } else if (this.requiredData.length === 0 && dataFun.length === 1) {
        return dataFun(finished);
      } else {
        mapFun = function(each, cb) {
          return each.value(cb);
        };
        return async.map(this.requiredData, mapFun, function(err, dataRes) {
          if (dataFun.length === 2) {
            return that.dataFun(dataRes, finished);
          } else {
            return finished(null, dataFun(dataRes));
          }
        });
      }
    };

    return Data;

  })();

  module.exports = {
    mapObject: mapObject,
    mapData: function(object, mapFun, cb) {
      return mapData([], object, mapFun, cb);
    },
    mapArray: mapArray,
    data: function(requiredData, dataOrFun) {
      return new Data(requiredData, dataOrFun);
    },
    Data: Data,
    ensure: ensure
  };

}