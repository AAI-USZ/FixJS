function testContains() {
  var tileBounds = new ol.TileBounds(1, 1, 3, 3);
  assertFalse(tileBounds.contains(new ol.TileCoord(0, 0, 0)));
  assertFalse(tileBounds.contains(new ol.TileCoord(0, 0, 1)));
  assertFalse(tileBounds.contains(new ol.TileCoord(0, 0, 2)));
  assertFalse(tileBounds.contains(new ol.TileCoord(0, 0, 3)));
  assertFalse(tileBounds.contains(new ol.TileCoord(0, 0, 4)));
  assertFalse(tileBounds.contains(new ol.TileCoord(0, 1, 0)));
  assertTrue(tileBounds.contains(new ol.TileCoord(0, 1, 1)));
  assertTrue(tileBounds.contains(new ol.TileCoord(0, 1, 2)));
  assertTrue(tileBounds.contains(new ol.TileCoord(0, 1, 3)));
  assertFalse(tileBounds.contains(new ol.TileCoord(0, 1, 4)));
  assertFalse(tileBounds.contains(new ol.TileCoord(0, 2, 0)));
  assertTrue(tileBounds.contains(new ol.TileCoord(0, 2, 1)));
  assertTrue(tileBounds.contains(new ol.TileCoord(0, 2, 2)));
  assertTrue(tileBounds.contains(new ol.TileCoord(0, 2, 3)));
  assertFalse(tileBounds.contains(new ol.TileCoord(0, 2, 4)));
  assertFalse(tileBounds.contains(new ol.TileCoord(0, 3, 0)));
  assertTrue(tileBounds.contains(new ol.TileCoord(0, 3, 1)));
  assertTrue(tileBounds.contains(new ol.TileCoord(0, 3, 2)));
  assertTrue(tileBounds.contains(new ol.TileCoord(0, 3, 3)));
  assertFalse(tileBounds.contains(new ol.TileCoord(0, 3, 4)));
  assertFalse(tileBounds.contains(new ol.TileCoord(0, 4, 0)));
  assertFalse(tileBounds.contains(new ol.TileCoord(0, 4, 1)));
  assertFalse(tileBounds.contains(new ol.TileCoord(0, 4, 2)));
  assertFalse(tileBounds.contains(new ol.TileCoord(0, 4, 3)));
  assertFalse(tileBounds.contains(new ol.TileCoord(0, 4, 4)));
}