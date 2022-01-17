function(value) {
      return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
    }