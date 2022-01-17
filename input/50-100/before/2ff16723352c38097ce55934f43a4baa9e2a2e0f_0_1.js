function getAllFlightsBounds() {
  var bounds = new OpenLayers.Bounds();

  for (fid in flights) {
    bounds.extend(flights[fid].geo.bounds);
  }

  return bounds;
}