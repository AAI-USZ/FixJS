function (feature, geojson) {
    var geometry;

    // if we got only the geojson, as first parameter, we will try to get the
    // correct feature
    if (!geojson) {
        geojson = feature;
        var feature = geojson.features[0];
        feature = this.getFeature(feature.properties.type, feature.properties.id);
    }

    // Get the geometry from geojson
    if (geojson.type == 'FeatureCollection' && geojson.features) {
        geometry = geojson.features[0].geometry;
    } else if (geojson.type == 'GeometryCollection' && geojson.geometries) {
        geometry = geojson.geometries[0];
    }

    // Update the feature geometry
    if (feature.getGeometryType() == geometry.type)
        feature.setCoordinates(geometry.coordinates);
}