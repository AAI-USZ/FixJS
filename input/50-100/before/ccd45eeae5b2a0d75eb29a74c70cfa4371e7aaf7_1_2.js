function () {
    var features = [];
    var geoJSON = {
        'type': 'FeatureCollection',
        'features': features
    };
    this.features_.forEach(function (feature, index, orig) {
        features.push(feature.getGeoJsonFeature());
    });
    return geoJSON;
}