function updateFlight(tracking_id, _lonlat, _levels, _num_levels, _time, _height) {
  var height = OpenLayers.Util.decodeGoogle(_height);
  var time = OpenLayers.Util.decodeGoogle(_time);
  var lonlat = OpenLayers.Util.decodeGooglePolyline(_lonlat);
  var lod = OpenLayers.Util.decodeGoogleLoD(_levels, _num_levels);

  var points = new Array();
  for (var i = 0, len = lonlat.length; i < len; i++) {
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

  flight.geo.components = points;
  flight.geo.componentsLevel = lod;
  flight.t = time;
  flight.h = height;
  flight.lonlat = lonlat;
  // recalculate bounds
  flight.geo.bounds = flight.geo.calculateBounds();
  // reset indices
  for (var i = 0, len = flight.geo.components.length; i < len; i++) {
    flight.geo.components[i].originalIndex = i;
  }

  barogram_t[fid] = time;
  barogram_h[fid] = height;
}