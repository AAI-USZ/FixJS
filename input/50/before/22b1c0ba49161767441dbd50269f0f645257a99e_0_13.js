function(x) {
    if (!arguments.length) return target;
    target = d3.functor(x);
    return diagonal;
  }