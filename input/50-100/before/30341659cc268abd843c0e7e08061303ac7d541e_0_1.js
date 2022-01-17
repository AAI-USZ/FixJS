function(monitor) {
    if (stats.counters[monitor.name] !== undefined) {
      monitor.check(stats.counters[k]);
    }
    else if (stats.gauges[k] !== undefined) {
      monitor.check(stats.gauges[k]);
    }
  }