function(d) {
    if (interactive)
      d3.select('.chart-' + id + ' .series-' + d.seriesIndex + ' .point-' + d.pointIndex)
          .classed('hover', true);
  }