function(ms) {
      var fn = this;
      var args = multiArgs(arguments).slice(1);
      setDelay(fn, ms, fn, fn, args);
      return fn;
    }