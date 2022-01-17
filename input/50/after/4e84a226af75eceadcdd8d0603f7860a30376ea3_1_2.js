function(value) {
      return typeof value === 'string' || balUtilTypes.toString(value) === '[object String]';
    }