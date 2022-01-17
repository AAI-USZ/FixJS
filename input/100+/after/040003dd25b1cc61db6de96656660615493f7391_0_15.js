function (geoJsonFeature, index, orig) {
        var geometry = geoJsonFeature.geometry;
        if (!geometry) {
            return;
        }
        feature = komooMap.getFeature(geoJsonFeature.properties.type, geoJsonFeature.properties.id);
        if (!feature)
            var type = komooMap.featureOptions[geoJsonFeature.properties.type];
            feature = komoo.features.makeFeature(geoJsonFeature);
            if (type) {
                feature.minZoomGeometry = type.minZoomGeometry;
                feature.maxZoomGeometry = type.maxZoomGeometry;
                feature.minZoomMarker = type.minZoomMarker;
                feature.maxZoomMarker = type.maxZoomMarker;
            }
        var paths = [];
        if (geoJsonFeature.properties && geoJsonFeature.properties.type && komooMap.featureOptions[geoJsonFeature.properties.type]) {
            var color = komooMap.featureOptions[geoJsonFeature.properties.type].color;
            var border = komooMap.featureOptions[geoJsonFeature.properties.type].border;
            var zIndex = komooMap.featureOptions[geoJsonFeature.properties.type].zIndex;
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
            feature.setOptions(polygonOptions);
        } else if (geometry.type == "LineString" || geometry.type == 'MultiLineString') {
            if (geometry.coordinates.length == 0) return;
            feature.setOptions(polylineOptions);
        } else if (geometry.type == "MultiPoint" || geometry.type == "Point") {
            if (geometry.coordinates.length == 0) return;
        }
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
    }