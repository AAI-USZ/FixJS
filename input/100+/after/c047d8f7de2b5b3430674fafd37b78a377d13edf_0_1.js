function() {
  var async, descend, ensure, mapArray, mapData, mapObject,
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
      if (typeof value === 'function') {
        switch (value.length) {
          case 0:
            return cb(null, value());
          case 1:
            return value(cb);
        }
      } else {
        return cb(null, value);
      }
    };
    return async.map(values, map, function(err, res) {
      return cb.apply(null, [null].concat(__slice.call(res)));
    });
  };

  module.exports = {
    mapObject: mapObject,
    mapData: function(object, mapFun, cb) {
      return mapData([], object, mapFun, cb);
    },
    mapArray: mapArray,
    ensure: ensure
  };

}