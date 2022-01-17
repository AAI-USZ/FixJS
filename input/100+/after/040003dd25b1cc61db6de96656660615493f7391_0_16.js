function (opt_options) {
    var options = opt_options || {};
    var geoJSON;
    var geoms = [];
    var list;
    var newOnly = options.newOnly || false;
    var currentOnly = options.currentOnly || false;
    var createGeometryCollection = options.geometryCollection || false;
    if (newOnly) {
        list = this.newFeatures;
    } else if (currentOnly) {
        list = komoo.collections.makeFeatureCollection({map: this});
        list.push(this.currentFeature);
    } else {
        list = this.features;
    }
    if (createGeometryCollection) {
        // TODO
        geoJSON = {
            "type": "GeometryCollection",
            "geometries": geoms
        };
    } else {
        return list.getGeoJson();
    }
    list.forEach(function (feature, index, orig) {
        geoms.push(feature.getGeoJsonGeometry());
    });
    return geoJSON;
}