function testContainsPositive() {
  var tileBounds = new ol.TileBounds(0, 0, 2, 2);
  var tileCoord = new ol.TileCoord(3, 1, 1);
  assertTrue(tileBounds.contains(tileCoord));
}