function(v) {
    if (!arguments.length) return radius;
    radius = d3_functor(v);
    return chord;
  }