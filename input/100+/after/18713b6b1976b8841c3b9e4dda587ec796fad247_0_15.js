function() {
    if (typeof source === "function") interpolate.source(p0 = source.apply(this, arguments));
    if (typeof target === "function") interpolate.target(p1 = target.apply(this, arguments));
    return interpolate.distance();
  }