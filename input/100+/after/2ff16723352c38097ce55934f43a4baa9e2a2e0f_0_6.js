function updateBarogram(e) {
  var linechart = barogram.linechart;
  var reset_y_axis = this.reset_y_axis || false;

  var largest_partition = null;
  var total_first = [];
  var total_last = [];
  var first_t = 999999;
  var last_t = 0;

  // circle throu all flights
  for (var fid = 0; fid < flights.length; fid++) {
    var flight = flights[fid];

    last = flight.t.length - 1;

    // if flight is not in viewport continue.
    if (flight.geo.partitionedGeometries.length == 0) continue;

    // show barogram of all trace parts visible
    var length = flight.geo.partitionedGeometries.length;
    var comp_length = flight.geo.partitionedGeometries[length-1].components.length;
    var first = flight.geo.partitionedGeometries[0].components[0].originalIndex;
    var last = flight.geo.partitionedGeometries[length-1].components[comp_length-1].originalIndex;

    // get first and last time which should be the bounds of the barogram
    if (flight.t[first] < first_t)
      first_t = flight.t[first];

    if (flight.t[last] > last_t)
     last_t = flight.t[last];
  }

  // is there any flight in our viewport?
  var none_in_range = true;

  for (var fid = 0; fid < flights.length; fid++) {
    // get indices of flight path between first_t(ime) and last_t(ime)
    first = getNearestNumber(flights[fid].t, first_t);
    last = getNearestNumber(flights[fid].t, last_t);

    if (flights[fid].t[first] > last_t || flights[fid].t[last] < first_t) {
      // current flight is out of range. don't show it in barogram...
      total_first.push(-1);
      total_last.push(-1);
    } else {
      total_first.push(first);
      total_last.push(last);
      none_in_range = false;
    }
  }

  if (none_in_range)
    // reset linechart zoom when no flight is visible in viewport
    linechart.zoomReset(reset_y_axis);
  else
    // zoom linechart
    linechart.zoomInto(total_first, total_last, reset_y_axis);
}