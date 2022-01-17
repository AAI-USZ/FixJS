function(ms) {
      var fn = this;
      var args = getArgs(arguments, 1);
      setDelay(fn, ms, fn, fn, args);
      return fn;
    }