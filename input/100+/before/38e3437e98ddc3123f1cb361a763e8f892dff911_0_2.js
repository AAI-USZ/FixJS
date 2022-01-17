function(value) {
      var item, key, obj, result;
      result = [];
      if (value) {
        if (_.isArray(value)) {
          result = value;
        } else if (_.isObject(value)) {
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