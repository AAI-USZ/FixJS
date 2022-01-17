function (feature) {
    if (!feature.geometry) return;
    var geometryType = feature.geometry.type;
    var geometry;
    if (geometryType == 'Point' || geometryType == 'MultiPoint' || geometryType == 'marker') {
        geometry = new komoo.geometries.MultiPoint();
    } else if (geometryType == 'LineString' || geometryType == 'polyline') {
        geometry = new komoo.geometries.Polyline();
    } else if (geometryType == 'Polygon' || geometryType == 'polygon') {
        geometry = new komoo.geometries.Polygon();
    }

    if (geometry && feature.geometry.coordinates) geometry.setCoordinates(feature.geometry.coordinates);

    return geometry;
}