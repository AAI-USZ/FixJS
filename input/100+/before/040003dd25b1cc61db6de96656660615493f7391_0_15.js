function (feature, index, orig) {
        var geometry = feature.geometry;
        if (!geometry) {
            return;
        }
        overlay = komooMap.getOverlay(feature.properties.type, feature.properties.id);
        if (!overlay)
            var type = komooMap.overlayOptions[feature.properties.type];
            overlay = komoo.features.makeFeature(feature);
            if (type) {
                overlay.minZoomGeometry = type.minZoomGeometry;
                overlay.maxZoomGeometry = type.maxZoomGeometry;
                overlay.minZoomMarker = type.minZoomMarker;
                overlay.maxZoomMarker = type.maxZoomMarker;
            }
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
            if (geometry.coordinates.length == 0 || geometry.coordinates[0].length == 0) return;
            overlay.setOptions(polygonOptions);
        } else if (geometry.type == "LineString" || geometry.type == 'MultiLineString') {
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
                categories.forEach(function(category, index, orig) {
                    if (overlaysByType[category.name]) {
                        overlaysByType[category.name].push(overlay);
                    }
                });
            } else {
                overlaysByType["uncategorized"].push(overlay);
            }
            if (overlay.getMarker()) {
                google.maps.event.addListener(overlay.getMarker(), "click", function () {
                    komooMap.googleMap.fitBounds(overlay.getBounds());
                });
                if (overlay.getProperties().type == "Community") {
                    komooMap.clusterMarkers.push(overlay.getMarker().getObject());
                }
            }
            overlay.updateIcon();
        }
    }