function setPrimaryFlight(primary) {
  // we'd like to have an flight within the current range as primary_flight.
  if (flights[primary].index == -1) {
    // our current primary flight is out of range. find first flight in range...
    for (var primary = 0; primary < flights.length; primary++) if (flights[primary].index != -1) break;
  }

  // the primary flight has changed...
  if (primary_flight != primary) {
    // update barogram and set primary_flight if it changed
    barogram.linechart.setPrimary(primary);

    var old_contest_traces = map.getLayersByName("Flight")[0].getFeaturesByAttribute("sfid", flights[primary_flight].sfid);
    var new_contest_traces = map.getLayersByName("Flight")[0].getFeaturesByAttribute("sfid", flights[primary].sfid);

    for (var i = 0; i < old_contest_traces.length; i++) {
      old_contest_traces[i].renderIntent = 'hidden';
      old_contest_traces[i].layer.drawFeature(old_contest_traces[i]);
    }

    for (var i = 0; i < new_contest_traces.length; i++) {
      new_contest_traces[i].renderIntent = 'contest';
      new_contest_traces[i].layer.drawFeature(new_contest_traces[i]);
    }
    primary_flight = primary;
  }
}