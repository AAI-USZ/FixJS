function (options) {
    var geoJSON;
    var geoms = [];
    var list;
    if (!options) {
        options = {};
    }
    var newOnly = options.newOnly || false;
    var currentOnly = options.currentOnly || false;
    var createGeometryCollection = options.geometryCollection || false;
    if (newOnly) {
        list = this.newOverlays;
    } else if (currentOnly) {
        list = komoo.collections.makeFeatureCollection({map: this});
        list.push(this.currentOverlay);
    } else {
        list = this.overlays;
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
    list.forEach(function (overlay, index, orig) {
        geoms.push(overlay.getGeoJsonGeometry());
    });
    return geoJSON;
}