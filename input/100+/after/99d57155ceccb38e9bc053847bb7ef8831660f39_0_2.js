function updateFlight(tracking_id, _lonlat, _levels, _num_levels, _time, _height) {
  var height = OpenLayers.Util.decodeGoogle(_height);
  var time = OpenLayers.Util.decodeGoogle(_time);
  var lonlat = OpenLayers.Util.decodeGooglePolyline(_lonlat);
  var lod = OpenLayers.Util.decodeGoogleLoD(_levels, _num_levels);

  // we skip the first point in the list because we assume it's the "linking" fix
  // between the data we already have and the data to add.

  if (lonlat.length < 2) return;

  var points = new Array();
  for (var i = 1, len = lonlat.length; i < len; i++) {
    points.push(new OpenLayers.Geometry.Point(lonlat[i].lon, lonlat[i].lat).
      transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()) );
  }

  // find the flight to update
  var update = -1;
  for (fid in flights) {
    if (tracking_id == flights[fid].sfid)
      update = fid;
  }

  if (update == -1) return;

  // update flight
  var flight = flights[update];

  flight.geo.components = flight.geo.components.concat(points); // points is already sliced
  flight.geo.componentsLevel = flight.geo.componentsLevel.concat(lod.slice(1));
  flight.t = flight.t.concat(time.slice(1));
  flight.h = flight.h.concat(height.slice(1));
  flight.lonlat = flight.lonlat.concat(lonlat.slice(1));

  // recalculate bounds
  flight.geo.bounds = flight.geo.calculateBounds();
  // reset indices
  for (var i = 0, len = flight.geo.components.length; i < len; i++) {
    flight.geo.components[i].originalIndex = i;
  }

  flight.last_update = flight.t[flight.t.length - 1];

  barogram_t[update] = barogram_t[update].concat(time.slice(1));
  barogram_h[update] = barogram_h[update].concat(height.slice(1));
}