function(obj, callback, context) {
      var broke, item, key, _i, _len;
      broke = false;
      context || (context = obj);
      if (balUtilTypes.isArray(obj)) {
        for (key = _i = 0, _len = obj.length; _i < _len; key = ++_i) {
          item = obj[key];
          if (callback.call(context, item, key, obj) === false) {
            broke = true;
            break;
          }
        }
      } else {
        for (key in obj) {
          if (!__hasProp.call(obj, key)) continue;
          item = obj[key];
          if (callback.call(context, item, key, obj) === false) {
            broke = true;
            break;
          }
        }
      }
      return this;
    }