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
}