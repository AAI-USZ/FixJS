function() {
    var latlon = new LatLon(52, 4);
    var ol = latlon.getLonLat();
    expect(ol.lat).toEqual(6800125.4534507);
    expect(ol.lon).toEqual(445277.96311111);
  }