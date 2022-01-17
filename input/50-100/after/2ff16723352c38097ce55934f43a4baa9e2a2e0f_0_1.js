function getAllFlightsBounds() {
  var bounds = new OpenLayers.Bounds();

  for (var fid = 0; fid < flights.length; fid++) {
    bounds.extend(flights[fid].geo.bounds);
  }

  return bounds;
}