function(latlon) {
  var center = LatLon.fromLonLat(this.map.getCenter());
  return (latlon.lat == center.lat) && (latlon.lon == center.lon);
}