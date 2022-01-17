function(value) {
      return typeof value === 'number' || balUtilTypes.toString(value) === '[object Number]';
    }