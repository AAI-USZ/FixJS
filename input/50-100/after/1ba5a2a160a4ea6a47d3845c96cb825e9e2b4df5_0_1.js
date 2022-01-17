function(latlon) {
  var center = LatLon.fromLonLat(this.map.getCenter());
  return (Math.abs(latlon.lat - center.lat) < 0.0001) && 
    (Math.abs(latlon.lon - center.lon) < 0.0001);
}