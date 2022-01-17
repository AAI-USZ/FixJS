function(x) {
    if (!arguments.length) return origin;
    origin = x;
    if (typeof origin !== "function") arc.source(origin);
    return circle;
  }