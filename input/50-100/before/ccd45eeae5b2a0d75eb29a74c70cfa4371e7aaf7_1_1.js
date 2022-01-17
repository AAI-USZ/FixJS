function (opts) {
    var options = opts || {};
    var features = options.features || [];
    var map = options.map || null;

    var featureCollection = new komoo.collections.FeatureCollection(options);

    if (map) featureCollection.setMap(map);
    if (features) features.forEach(function (feature, index, orig) {
        featureCollections.push(feature);
    });

    return featureCollection;
}