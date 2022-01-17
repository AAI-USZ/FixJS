function(_) {
    if (!arguments.length) return getX;
    getX = d3.functor(_);
    return chart;
  }