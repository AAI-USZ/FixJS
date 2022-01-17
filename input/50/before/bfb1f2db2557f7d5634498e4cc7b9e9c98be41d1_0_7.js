function(_) {
    if (!arguments.length) return getSize;
    getSize = d3.functor(_);
    return chart;
  }