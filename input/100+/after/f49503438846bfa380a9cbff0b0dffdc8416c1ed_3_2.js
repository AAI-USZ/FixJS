function passthroughCallable(f) {
    return {
      call: function ($this) {
        Array.prototype.shift.call(arguments);
        return f.apply($this, arguments);
      },
      apply: function ($this, args) {
        return f.apply($this, args);
      }
    };
  }