function() {
      var key, obj, objs, target, value, _i, _len;
      target = arguments[0], objs = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      target || (target = {});
      for (_i = 0, _len = objs.length; _i < _len; _i++) {
        obj = objs[_i];
        obj || (obj = {});
        for (key in obj) {
          if (!__hasProp.call(obj, key)) continue;
          value = obj[key];
          target[key] = value;
        }
      }
      return target;
    }