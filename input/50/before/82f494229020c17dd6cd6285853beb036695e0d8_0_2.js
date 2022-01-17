function(_) {
    if (!arguments.length) return getY;
    getY = _;
    stocks.y(_);
    lines.y(_);
    bars.y(_);
    return chart;
  }