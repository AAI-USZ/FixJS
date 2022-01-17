function (geoJSON, panTo, opt_attach) {
    // TODO: Refactoring
    // TODO: Use the correct color
    // TODO: Add a hidden marker for each polygon/polyline
    // TODO: Document the geoJSON properties:
    // - userCanEdit
    // - type (community, need...)
    var komooMap = this;
    var featureCollection;
    var features = komoo.collections.makeFeatureCollection({map: this});

    if (opt_attach === undefined) {
        opt_attach = true;
    }

    var polygonOptions = $.extend({
        clickable: true,
        editable: false,
        zIndex: 1
    }, this.options.featureOptions);
    var polylineOptions = $.extend({
        clickable: true,
        editable: false,
        zIndex: 3
    }, this.options.featureOptions);
    var markerOptions = {};

    if (!geoJSON.type) return; // geoJSON is invalid.

    if (geoJSON.type == "FeatureCollection") {
        geoJsonFeatureCollection = geoJSON.features;
    }
    var feature;
    if (!geoJsonFeatureCollection) {
        return [];
    }
    geoJsonFeatureCollection.forEach(function (geoJsonFeature, index, orig) {
        var geometry = geoJsonFeature.geometry;
        feature = komooMap.getFeature(geoJsonFeature.properties.type, geoJsonFeature.properties.id);
        if (!feature)
            feature = komoo.features.makeFeature(geoJsonFeature, komooMap.featureOptions);
        var paths = [];

        // Dont attach or return the features already loaded
        if (feature) {
            feature = komooMap.loadedFeatures[geoJsonFeature.properties.type + "_" + geoJsonFeature.properties.id] || feature;
            if (!komooMap.loadedFeatures[feature.getProperties().type + "_" + feature.getProperties().id]) {
                komooMap.features.push(feature);
                komooMap.loadedFeatures[feature.getProperties().type + "_" + feature.getProperties().id] = feature;
                komooMap._attachFeatureEvents(feature);
            }
            features.push(feature);
            if (opt_attach) {
                feature.setMap(komooMap);
            }
            var featuresByType = komooMap.featuresByType[feature.getProperties().type];
            var categories = feature.getProperties().categories;
            if (categories && categories.length) {
                categories.forEach(function(category, index, orig) {
                    if (featuresByType[category.name]) {
                        featuresByType[category.name].push(feature);
                    }
                });
            } else {
                featuresByType["uncategorized"].push(feature);
            }
            if (feature.getMarker()) {
                google.maps.event.addListener(feature.getMarker(), "click", function () {
                    komooMap.googleMap.fitBounds(feature.getBounds());
                });
                if (feature.getProperties().type == "Community") {
                    komooMap.clusterMarkers.push(feature.getMarker().getOverlay());
                }
            }
            feature.updateIcon();
        }
    });
    if (panTo && feature.getBounds()) {
        this.googleMap.fitBounds(feature.getBounds());
    }

    this._emit_geojson_loaded(geoJSON);
    return features;
}