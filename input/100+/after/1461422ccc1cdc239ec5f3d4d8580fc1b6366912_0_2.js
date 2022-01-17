function(obj, callback, context) {
      var item, key, _i, _len;
      context || (context = obj);
      if (balUtilTypes.isArray(obj)) {
        for (key = _i = 0, _len = obj.length; _i < _len; key = ++_i) {
          item = obj[key];
          if (callback.call(context, item, key, obj) === false) {
            break;
          }
        }
      } else {
        for (key in obj) {
          if (!__hasProp.call(obj, key)) continue;
          item = obj[key];
          if (callback.call(context, item, key, obj) === false) {
            break;
          }
        }
      }
      return this;
    }