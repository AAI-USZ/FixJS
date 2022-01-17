function(x) {
    if (!arguments.length) return size;
    size = d3.functor(x);
    return symbol;
  }