function buildEnumerableMethods(names, mapping) {
    var methods = {};
    arrayEach(names.split(','), function(name) {
      methods[name] = function(obj, arg1) {
        var keys = object.keys(obj), tmp, result;
        result = array.prototype[name].call(keys, function(key) {
          if(object.isFunction(arg1)) {
            return arg1.call(obj, key, obj[key], obj);
          } else if(mapping) {
            return transformArgument(obj[key], arg1, obj);
          } else {
            return obj[key] === arg1;
          }
        });
        if(object.isArray(result)) {
          if(name === 'map') {
            tmp = result;
            result = keys;
          }
          // The method has returned an array of keys so use this array
          // to build up the resulting object in the form we want it in.
          result = result.reduce(function(o, key, i) {
            o[key] = tmp ? tmp[i] : obj[key];
            return o;
          }, {});
        }
        return result;
      };
    });
    extend(object, false, false, methods);
  }