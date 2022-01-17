function constructGraphs() {
  for (var metric in realMetrics) {
    var target = realMetrics[metric].target
    var alias = realMetrics[metric].alias || realMetrics[metric].target;
    aliases[target] = alias;
    datum[target] = [{ x:0, y:0 }];
    graphs[target] = new Rickshaw.Graph({
      element: document.querySelector('.graph' + realMetrics[metric].selector),
      width: 208,
      height: 100,
      interpolation: 'step-after',
      series: [{
        name: aliases[target],
        color: '#afdab1',
        data: datum[target]
      }]
    });
    graphs[target].render();
  }
}