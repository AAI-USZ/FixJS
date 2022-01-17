function updateGraph(graph) {
  // update our graph
  graphs[graph].update();
  if (datum[graph][datum[graph].length - 1] !== undefined) {
    var lastValue = datum[graph][datum[graph].length - 1].y;
    var lastValueDisplay = Math.round(lastValue * 100) / 100;
    $('.overlay-name' + realMetrics[graph].selector).text(aliases[graph]);
    $('.overlay-number' + realMetrics[graph].selector).text(lastValueDisplay);
    if (realMetrics[graph].unit) {
      $('.overlay-number' + realMetrics[graph].selector).append('<span class="unit">' + realMetrics[graph].unit + '</span>');
    }
  } else {
    $('.overlay-name' + realMetrics[graph].selector).text(aliases[graph]);
    $('.overlay-number' + realMetrics[graph].selector).html('<span class="error">NF</span>');
  }
}