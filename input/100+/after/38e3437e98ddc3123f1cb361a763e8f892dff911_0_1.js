function(value) {
      var item, key, result;
      result = [];
      if (value) {
        if (util.isArray(value)) {
          result = value;
        } else if (util.isObject(value)) {
          for (key in value) {
            if (!__hasProp.call(value, key)) continue;
            item = value[key];
            result.push(item);
          }
        } else {
          result.push(value);
        }
      }
      return result;
    }