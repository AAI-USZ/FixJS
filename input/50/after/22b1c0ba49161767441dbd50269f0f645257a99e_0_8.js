function(v) {
    if (!arguments.length) return source;
    source = d3_functor(v);
    return chord;
  }