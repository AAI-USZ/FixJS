function setFlightTime(time) {
  // hide all planes
  hidePlanePosition();
  barogram.linechart.hoverColumn.position.hide();

  // find the position indexes of all flight available.
  setIndexFromTime(time);

  // set the primary flight
  setPrimaryFlight(primary_flight);

  // no flight found which is in range? return early, draw nothing.
  if (flights[primary_flight].index == -1) return;

  // interpolate current height of primary_flight
  var height = flights[primary_flight].h[flights[primary_flight].index] +
    (flights[primary_flight].h[flights[primary_flight].index+1] - flights[primary_flight].h[flights[primary_flight].index]) *
     flights[primary_flight].dx;

  // calculate y-position of position marker for current primary_flight and show marker
  var prop = barogram.linechart.getProperties();
  var rel_x = (time - prop.minx) * prop.kx + prop.x + prop.gutter;
  var rel_y = prop.y - (height - prop.miny) * prop.ky + prop.height - prop.gutter;
  barogram.linechart.hoverColumn(flights[primary_flight].index, rel_x, rel_y, primary_flight);

  // draw plane icons on map
  for (var fid = 0; fid < flights.length; fid++) {
    // do not show plane if out of range.
    if (flights[fid].index == -1) continue;

    showPlanePosition(flights[fid].index, flights[fid].dx, fid, (fid!=primary_flight));
  }
}