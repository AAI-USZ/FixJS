function(d) {
    var source = realMetrics[metric].source;
    var transform = d.attributes.display_transform;
    var period = d.period;
    myDatum[0] = {
      x: d.measurements[source][0].measure_time,
      y: displayTransform(d.measurements[source][0].value, period, transform) || 0
    };
    for (var j = 1; j < d.measurements[source].length; j++) {
      myDatum[j] = {
        x: d.measurements[source][j].measure_time,
        y: displayTransform(d.measurements[source][j].value, period, transform) || graphs[metric].lastKnownValue
      };
      if (typeof d.measurements[source][0].value === "number") {
        graphs[metric].lastKnownValue = d.measurements[source][0].value;
      }
    }
    cb(myDatum);
  }