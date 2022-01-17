function(v) {
    if (!arguments.length) return startAngle;
    startAngle = d3_functor(v);
    return chord;
  }