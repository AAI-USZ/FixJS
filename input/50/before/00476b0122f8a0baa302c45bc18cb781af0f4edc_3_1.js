function(name) {
      return function(precision) {
        return round(this, precision, name);
      }
    }