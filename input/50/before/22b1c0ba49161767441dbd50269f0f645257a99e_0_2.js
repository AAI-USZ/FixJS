function(v) {
    if (!arguments.length) return innerRadius;
    innerRadius = d3.functor(v);
    return arc;
  }