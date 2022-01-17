function () {
    var graphs = this.graphs,
        configs = this.config.graphs,
        n = graphs.length,
        graph, config, metrics, m;

    while(n--) {
      config = $.extend(true, {}, configs[n]);
      config.range = Dashboard.adjustRangeForMode(config.range, config.type === 'map');
      if(config.type !== "map") {
        if(Dashboard.dataMode !== "realtime") config.refreshRate = 0;
        metrics = config.metrics;
        m = metrics.length;
        while(m--) {
          metrics[m] = Dashboard.adjustPathForMode(metrics[m], config.sumWith);
        }
      }

      graphs[n].clear();
      graphs[n] = null;
      graphs[n] = config.type === "map" ? new Map(config) : new Graph(config);
    }
  }