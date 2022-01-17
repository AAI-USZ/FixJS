function(monitor) {
    if (stats.counters[monitor.name] !== undefined) {
      monitor.check(stats.counters[monitor.name]);
    }
    else if (stats.gauges[monitor.name] !== undefined) {
      monitor.check(stats.gauges[monitor.name]);
    }
  }