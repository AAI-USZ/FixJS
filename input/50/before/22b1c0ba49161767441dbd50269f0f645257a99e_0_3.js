function(v) {
    if (!arguments.length) return outerRadius;
    outerRadius = d3.functor(v);
    return arc;
  }