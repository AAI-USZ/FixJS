function(_) {
    if (!arguments.length) return getY;
    getY = d3.functor(_);
    return chart;
  }