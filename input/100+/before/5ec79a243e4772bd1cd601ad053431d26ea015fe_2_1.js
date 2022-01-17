function (feature) {
    var geometryType = feature.geometry.type;
    var geometry;
    if (geometryType == 'Point' || geometryType == 'MultiPoint') {
        geometry = new komoo.geometries.MultiPoint();
    } else if (geometryType == 'LineString') {
        geometry = new komoo.geometries.Polyline();
    } else if (geometryType == 'Polygon') {
        geometry = new komoo.geometries.Polygon();
    }

    if (geometry) geometry.setCoordinates(feature.geometry.coordinates);

    return geometry;
}