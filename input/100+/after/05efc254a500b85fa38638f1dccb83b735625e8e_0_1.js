function(obj, arg1, arg2) {
        var result;
        if(reducing) {
          return array.prototype[name].apply(object.values(obj), array.create(arguments).slice(1));
        } else {
          result = array.prototype[name].call(object.keys(obj), function(key) {
            if(mapping) {
              return transformArgument(obj[key], arg1, obj, [key, obj[key], obj]);
            } else {
              return multiMatch(obj[key], arg1, obj, [key, obj[key], obj]);
            }
          });
          if(object.isArray(result)) {
            // The method has returned an array of keys so use this array
            // to build up the resulting object in the form we want it in.
            result = result.reduce(function(o, key, i) {
              o[key] = obj[key];
              return o;
            }, {});
          }
          return result;
        }
      }