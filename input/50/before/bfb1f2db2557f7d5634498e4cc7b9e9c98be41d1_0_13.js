function(_) {
    if (!arguments.length) return pointActive;
    pointActive = _;
    return chart;
  }