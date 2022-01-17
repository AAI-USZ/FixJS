function(v) {
    if (!arguments.length) return target;
    target = d3.functor(v);
    return chord;
  }