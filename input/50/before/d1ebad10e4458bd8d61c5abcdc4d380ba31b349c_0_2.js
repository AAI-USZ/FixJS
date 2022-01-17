function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  }