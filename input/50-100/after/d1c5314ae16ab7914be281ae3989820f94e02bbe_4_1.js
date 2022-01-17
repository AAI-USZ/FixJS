function(array, f) {
    if (arguments.length) {
      r = (array instanceof Array)
          ? ((arguments.length > 1) ? pv.map(array, f) : array)
          : Array.prototype.slice.call(arguments);
      if (typeof r[0] == "string") r = r.map(pv.color);
      return this;
    }
    return r;
  }