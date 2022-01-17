function (geoJSON, panTo, opt_attach) {
    // TODO: Use the correct color
    // TODO: Add a hidden marker for each polygon/polyline
    // TODO: Document the geoJSON properties:
    // - userCanEdit
    // - type (community, need...)
    var komooMap = this;
    var featureCollection;
    var overlays = [];

    if (opt_attach === undefined) {
        opt_attach = true;
    }

    var polygonOptions = $.extend({
        clickable: true,
        editable: false,
        zIndex: 1
    }, this.options.overlayOptions);
    var polylineOptions = $.extend({
        clickable: true,
        editable: false,
        zIndex: 3
    }, this.options.overlayOptions);
    var markerOptions = {};

    if (!geoJSON.type) return; // geoJSON is invalid.

    if (geoJSON.type == "FeatureCollection") {
        featureCollection = geoJSON.features;
    }
    var overlay;
    if (!featureCollection) {
        return [];
    }
    $.each(featureCollection, function (i, feature) {
        var geometry = feature.geometry;
        if (!geometry) {
            return;
        }
        overlay = komooMap.getOverlay(feature.properties.type, feature.properties.id);
        if (!overlay)
            overlay = komoo.features.makeFeature(feature);
        var paths = [];
        if (feature.properties && feature.properties.type && komooMap.overlayOptions[feature.properties.type]) {
            var color = komooMap.overlayOptions[feature.properties.type].color;
            var border = komooMap.overlayOptions[feature.properties.type].border;
            var zIndex = komooMap.overlayOptions[feature.properties.type].zIndex;
            polygonOptions.fillColor = color;
            polygonOptions.strokeColor = border;
            polygonOptions.strokeWeight = 1.5;
            polygonOptions.zIndex = zIndex; //feature.properties.type == "community" ? 1 : 2
            polylineOptions.strokeColor = border;
        } else {
            // TODO: set a default color
        }
        if (geometry.type == "Polygon") {
            if (geometry.coordinates[0].length == 0) return;
            overlay.setOptions(polygonOptions);
        } else if (geometry.type == "LineString") {
            if (geometry.coordinates.length == 0) return;
            overlay.setOptions(polylineOptions);
        } else if (geometry.type == "MultiPoint" || geometry.type == "Point") {
            if (geometry.coordinates.length == 0) return;
        }
        // Dont attach or return the overlays already loaded
        if (overlay) {
            overlay = komooMap.loadedOverlays[feature.properties.type + "_" + feature.properties.id] || overlay;
            if (!komooMap.loadedOverlays[overlay.getProperties().type + "_" + overlay.getProperties().id]) {
                komooMap.overlays.push(overlay);
                komooMap.loadedOverlays[overlay.getProperties().type + "_" + overlay.getProperties().id] = overlay;
                komooMap._attachOverlayEvents(overlay);
            }
            overlays.push(overlay);
            if (opt_attach) {
                overlay.setMap(komooMap.googleMap);
            }
            var overlaysByType = komooMap.overlaysByType[overlay.getProperties().type];
            var categories = overlay.getProperties().categories;
            if (categories && categories.length) {
                $.each(categories, function(i, category) {
                    if (overlaysByType[category.name]) {
                        overlaysByType[category.name].push(overlay);
                    }
                });
            } else {
                overlaysByType["uncategorized"].push(overlay);
            }
            if (!overlay.getMarker()) {
                overlay.setMarker(new google.maps.Marker({
                        visible: true,
                        clickable: true
                }));
                if (overlay.getMarker()) {
                    overlay.getMarker().setMap(komooMap.googleMap)
                    overlay.getMarker().setPosition(overlay.getCenter());
                    overlay.getMarker().setIcon(overlay.getIconUrl(komooMap.googleMap.getZoom()));
                    google.maps.event.addListener(overlay.getMarker(), "click", function () {
                        komooMap.googleMap.fitBounds(overlay.getBounds());
                    });
                    if (overlay.getProperties().type == "community") {
                        komooMap.clusterMarkers.push(overlay.getMarker());
                    }
                }
                // TODO: Add mouseover handler to open info window
            }
        }
    });
    if (panTo && overlay.getBounds()) {
        this.googleMap.fitBounds(overlay.getBounds());
    }

    this._emit_geojson_loaded(geoJSON);
    return overlays;
}