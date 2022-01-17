function(value) {
      var item, key, obj, result;
      result = [];
      if (value) {
        if (util.isArray(value)) {
          result = value;
        } else if (util.isObject(value)) {
          for (key in value) {
            if (!__hasProp.call(value, key)) continue;
            item = value[key];
            obj = {};
            obj[key] = item;
            result.push(obj);
          }
        } else {
          result.push(value);
        }
      }
      return result;
    }