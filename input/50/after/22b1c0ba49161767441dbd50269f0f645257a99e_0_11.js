function(v) {
    if (!arguments.length) return endAngle;
    endAngle = d3_functor(v);
    return chord;
  }