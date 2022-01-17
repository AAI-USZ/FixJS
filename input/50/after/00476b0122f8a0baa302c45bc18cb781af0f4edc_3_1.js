function(name, methods) {
      methods[name] = function(precision) {
        return round(this, precision, name);
      }
    }