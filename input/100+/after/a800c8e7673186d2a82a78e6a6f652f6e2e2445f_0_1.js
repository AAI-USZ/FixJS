function graphite_flush(ts, metrics) {
  var starttime = Date.now();
  var statString = '';
  var numStats = 0;
  var key;

  var counters = metrics.counters;
  var gauges = metrics.gauges;
  var timers = metrics.timers;
  var pctThreshold = metrics.pctThreshold;

  for (key in counters) {
    var value = counters[key];
    var valuePerSecond = value / (flushInterval / 1000); // calculate "per second" rate

    statString += 'stats.' + key + '.rate '  + valuePerSecond + ' ' + ts + "\n";
    statString += 'stats.' + key + '.count ' + value          + ' ' + ts + "\n";

    numStats += 1;
  }

  for (key in timers) {
    if (timers[key].length > 0) {
      var values = timers[key].sort(function (a,b) { return a-b; });
      var count = values.length;
      var min = values[0];
      var max = values[count - 1];

      var cumulativeValues = [min];
      for (var i = 1; i < count; i++) {
          cumulativeValues.push(values[i] + cumulativeValues[i-1]);
      }

      var sum = min;
      var mean = min;
      var maxAtThreshold = max;

      var message = "";

      var key2;

      for (key2 in pctThreshold) {
        var pct = pctThreshold[key2];
        if (count > 1) {
          var thresholdIndex = Math.round(((100 - pct) / 100) * count);
          var numInThreshold = count - thresholdIndex;

          maxAtThreshold = values[numInThreshold - 1];
          sum = cumulativeValues[numInThreshold - 1];
          mean = sum / numInThreshold;
        }

        var clean_pct = '' + pct;
        clean_pct.replace('.', '_');
        message += 'stats.' + key + '.mean_'  + clean_pct + ' ' + mean           + ' ' + ts + "\n";
        message += 'stats.' + key + '.upper_' + clean_pct + ' ' + maxAtThreshold + ' ' + ts + "\n";
        message += 'stats.' + key + '.sum_' + clean_pct + ' ' + sum + ' ' + ts + "\n";
      }

      sum = cumulativeValues[count-1];
      mean = sum / count;

      var sumOfDiffs = 0;
      for (var i = 0; i < count; i++) {
         sumOfDiffs += (values[i] - mean) * (values[i] - mean);
      }
      var stddev = Math.sqrt(sumOfDiffs / count);

      message += 'stats.' + key + '.std ' + stddev  + ' ' + ts + "\n";
      message += 'stats.' + key + '.upper ' + max   + ' ' + ts + "\n";
      message += 'stats.' + key + '.lower ' + min   + ' ' + ts + "\n";
      message += 'stats.' + key + '.count ' + count + ' ' + ts + "\n";
      message += 'stats.' + key + '.sum ' + sum  + ' ' + ts + "\n";
      message += 'stats.' + key + '.mean ' + mean + ' ' + ts + "\n";
      statString += message;

      numStats += 1;
    }
  }

  for (key in gauges) {
    statString += 'stats.gauges.' + key + ' ' + gauges[key] + ' ' + ts + "\n";
    numStats += 1;
  }

  statString += 'statsd.numStats ' + numStats + ' ' + ts + "\n";
  statString += 'stats.statsd.graphiteStats.calculationtime ' + (Date.now() - starttime) + ' ' + ts + "\n";
  post_stats(statString);
}