function(x) {
    if (!arguments.length) return source;
    source = d3.functor(x);
    return diagonal;
  }