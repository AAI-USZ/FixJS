function() {
    var latlon = new LatLon(52, 4);
    var ol = latlon.getLonLat();
    expect(ol.lat).toBeCloseTo(6800125.45345, 5);
    expect(ol.lon).toBeCloseTo(445277.96311, 5);
  }