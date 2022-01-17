function(name, methods) {
      methods[name] = function(a, b) {
        return math[name](this, a, b);
      }
    }