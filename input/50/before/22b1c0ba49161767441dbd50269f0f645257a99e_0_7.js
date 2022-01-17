function(v) {
    if (!arguments.length) return radius;
    radius = d3.functor(v);
    return chord;
  }