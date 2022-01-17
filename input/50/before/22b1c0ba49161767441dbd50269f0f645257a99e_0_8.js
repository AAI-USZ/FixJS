function(v) {
    if (!arguments.length) return source;
    source = d3.functor(v);
    return chord;
  }