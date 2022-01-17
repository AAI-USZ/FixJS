function(values) {
      for (var i = 0; i < values.length; i++) {
        if (typeof values[i] !== "undefined") {
          datum[metric][i] = values[i];
        }
      }
      // check our thresholds and update color
      var lastValue = datum[metric][datum[metric].length - 1].y;
      var warning = realMetrics[metric].warning;
      var critical = realMetrics[metric].critical;
      if (critical > warning) {
        if (lastValue >= critical) {
          graphs[metric].series[0].color = '#d59295';
        } else if (lastValue >= warning) {
          graphs[metric].series[0].color = '#f5cb56';
        } else {
          graphs[metric].series[0].color = '#afdab1';
        }
      } else {
        if (lastValue <= critical) {
          graphs[metric].series[0].color = '#d59295';
        } else if (lastValue <= warning) {
          graphs[metric].series[0].color = '#f5cb56';
        } else {
          graphs[metric].series[0].color = '#afdab1';
        }
      }
      // we want to render immediately, i.e.
      // as soon as ajax completes
      // used for time period / pause view
      updateGraph(metric);
    }