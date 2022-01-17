function addBingLayers(api_key) {
  if (api_key == 'null')
    return;

  // Bing's Road imagerySet
  var road = new OpenLayers.Layer.Bing({
      key: api_key,
      type: "Road"
  });

  // Bing's AerialWithLabels imagerySet
  var hybrid = new OpenLayers.Layer.Bing({
      key: api_key,
      type: "AerialWithLabels",
      name: "Bing Satellite"
  });

  map.addLayers([road, hybrid]);

  // disable airspace layer when bing layers are shown
  // seems to be due to off-by-one bug of zoomLevel, see https://github.com/openlayers/openlayers/issues/418
  // should be reverted if the OL bug is fixed.
  var airspace = map.getLayersByName('Airspace')[0];
  map.events.register('changebaselayer', this, function() {
    if (road.getVisibility() || hybrid.getVisibility()) {
      airspace.setVisibility(false);
    } else {
      airspace.setVisibility(true);
    }
  });
}