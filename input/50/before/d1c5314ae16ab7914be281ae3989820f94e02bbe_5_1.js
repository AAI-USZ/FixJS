function(f) {
      offset = (f instanceof Function) ? f : function() { return f; };
      return this;
    }