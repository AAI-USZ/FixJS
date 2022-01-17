function hidePlanePosition() {
  for (var fid = 0; fid < flights.length; fid++) {
    map.getLayersByName("Flight")[0].removeFeatures(flights[fid].plane);
  }
}