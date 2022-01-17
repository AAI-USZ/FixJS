function(v) {
    if (!arguments.length) return endAngle;
    endAngle = d3.functor(v);
    return arc;
  }