function(x) {
    if (!arguments.length) return arc.precision();
    arc.precision(x);
    return circle;
  }