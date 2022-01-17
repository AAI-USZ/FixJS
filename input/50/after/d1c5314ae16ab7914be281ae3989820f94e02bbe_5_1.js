function(f) {
    if (arguments.length) {
      offset = (typeof f == "function") ? f : function() { return f; };
      return this;
    }
    return offset;
  }