function (overlay, geojson) {
    var geometry;

    // if we got only the geojson, as first parameter, we will try to get the
    // correct overlay
    if (!geojson) {
        geojson = overlay;
        var feature = geojson.features[0];
        overlay = this.getOverlay(feature.properties.type, feature.properties.id);
    }

    // Get the geometry from geojson
    if (geojson.type == "FeatureCollection") {
        geometry = geojson.features[0].geometry;
    } else if (geojson.type == "GeometryCollection") {
        geometry = geojson.geometries[0];
    }

    // Update the overlay geometry
    //if (overlay.getGeometryType == geometry.type)
        //overlay.setCoordinates(geometry.coordinates);
}