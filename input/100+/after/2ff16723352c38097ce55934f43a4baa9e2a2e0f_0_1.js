function addFlight(sfid, _lonlat, _levels, _num_levels, _time, _height, _enl, zoom_levels, _contests) {
  var height = OpenLayers.Util.decodeGoogle(_height);
  var time = OpenLayers.Util.decodeGoogle(_time);
  var enl = OpenLayers.Util.decodeGoogle(_enl);
  var lonlat = OpenLayers.Util.decodeGooglePolyline(_lonlat);
  var lod = OpenLayers.Util.decodeGoogleLoD(_levels, _num_levels);

  var points = new Array();
  for (var i = 0, len = lonlat.length; i < len; i++) {
    points.push(new OpenLayers.Geometry.Point(lonlat[i].lon, lonlat[i].lat).
      transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()) );
  }

  // add new flight
  var flight = new OpenLayers.Geometry.ProgressiveLineString(points, lod, zoom_levels);
  flight.clip = 1;

  var color = colors[flights.length%colors.length];
  var feature = new OpenLayers.Feature.Vector(flight, { color: color });

  var plane = new OpenLayers.Feature.Vector(
    new OpenLayers.Geometry.Point(lonlat[0].lon, lonlat[0].lat).
      transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()),
    { rotation: 0 }
  );
  plane.renderIntent = 'plane';

  map.getLayersByName("Flight")[0].addFeatures([feature, plane]);

  var contests = [],
      markers = [];
  for (var i = 0; i < _contests.length; i++) {
    var turnpoints = OpenLayers.Util.decodeGooglePolyline(_contests[i].turnpoints);
    var times = OpenLayers.Util.decodeGoogle(_contests[i].times);

    contests.push({
      name: _contests[i].name,
      turnpoints: turnpoints,
      times: times,
      visible: true // this is only valid for the contests of this flight.
    });

    markers.push(addContest(_contests[i].name, turnpoints, times, true, sfid));
  }

  flights.push({
    lonlat: lonlat,
    t: time,
    h: height,
    enl: enl,
    geo: flight,
    color: color,
    plane: plane,
    sfid: sfid,
    index: 0,
    dx: 0,
    last_update: time[time.length - 1],
    contests: contests,
    markers: markers
  });

  var i = flights.length - 1;

  barogram_t.push(flights[i].t);
  barogram_h.push(flights[i].h);
  barogram_enl.push(flights[i].enl);
  barogram_markers.push(flights[i].markers);

  return i;
}