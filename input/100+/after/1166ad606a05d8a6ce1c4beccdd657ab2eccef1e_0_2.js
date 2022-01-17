function graphite_init(startup_time, config, events) {
  debug = config.debug;
  graphiteHost = config.graphiteHost;
  graphitePort = config.graphitePort;
  timerPrefix = config.timerPrefix;
  gaugePrefix = config.gaugePrefix;;
  if (timerPrefix == null) { timerPrefix = 'timers.'; }
  if (gaugePrefix == null) { gaugePrefix = 'gauges.'; }

  graphiteStats.last_flush = startup_time;
  graphiteStats.last_exception = startup_time;

  flushInterval = config.flushInterval;

  events.on('flush', flush_stats);
  events.on('status', backend_status);

  return true;
}