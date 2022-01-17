function(v) {
    if (!arguments.length) return target;
    target = d3_functor(v);
    return chord;
  }