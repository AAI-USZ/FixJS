function(v) {
    if (!arguments.length) return startAngle;
    startAngle = d3.functor(v);
    return arc;
  }