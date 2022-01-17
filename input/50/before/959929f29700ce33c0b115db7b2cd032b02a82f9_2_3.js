function(value) {
      return (method.call ? method || value : value[method]).apply(value, args);
    }