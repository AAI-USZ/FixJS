function () {
    return self.chart.tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
  }