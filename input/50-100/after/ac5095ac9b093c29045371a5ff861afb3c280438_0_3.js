function(obj) {
      var values = object.keys(obj).map(function(key) {
        return obj[key];
      });
      return values.reduce.apply(values, multiArgs(arguments).slice(1));
    }