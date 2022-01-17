function hidePlanePosition() {
  for (fid in flights) {
    map.getLayersByName("Flight")[0].removeFeatures(flights[fid].plane);
  }
}