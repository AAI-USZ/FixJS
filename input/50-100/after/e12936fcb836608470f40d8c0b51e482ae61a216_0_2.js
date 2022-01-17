function(chance, func) {
    return function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (Random.prototype.chance(chance)) {
        return func.apply(this, args);
      }
    };
  }