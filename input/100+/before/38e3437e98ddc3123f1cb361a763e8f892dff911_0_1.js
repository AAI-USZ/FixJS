function(value) {
      var item, key, result;
      result = [];
      if (value) {
        if (_.isArray(value)) {
          result = value;
        } else if (_.isObject(value)) {
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