function(x) {
    if (!arguments.length) return target;
    target = d3_functor(x);
    return diagonal;
  }