function (e) {
        // FIXME: REWRITE

        var path;
        if (e.overlay.getPath) {
            path = e.overlay.getPath();
        }

        var overlay;
        if ((komooMap.editMode == komoo.EditMode.CUTOUT || komooMap.editMode == komoo.EditMode.ADD) &&
                    e.overlay.getPaths) {
            // Gets the overlays path orientation.
            var paths = komooMap.currentOverlay.getGeometry().getPaths();
            if (paths.length > 0) {
                // Gets the paths orientations.
                var sArea = google.maps.geometry.spherical.computeSignedArea(path);
                var sAreaAdded = google.maps.geometry.spherical.computeSignedArea(
                        paths.getAt(0));
                var orientation = sArea / Math.abs(sArea);
                var orientationAdded = sAreaAdded / Math.abs(sAreaAdded);
                // Verify the paths orientation.
                if ((orientation == orientationAdded && komooMap.editMode == komoo.EditMode.CUTOUT) ||
                        orientation != orientationAdded && komooMap.editMode == komoo.EditMode.ADD) {
                    /* Reverse path orientation to correspond to the action  */
                    path = new google.maps.MVCArray(path.getArray().reverse());
                }
            }
            paths.push(path);
            komooMap.currentOverlay.getGeometry().setPaths(paths);
            // Remove the temporary overlay from map
            e.overlay.setMap(null);
            komooMap.setEditMode(komoo.EditMode.DRAW);
        } else if (komooMap.editMode == komoo.EditMode.ADD && e.overlay.getPosition) {
            komooMap.currentOverlay.getGeometry().addMarker(e.overlay);
            komooMap.setEditMode(komoo.EditMode.DRAW);
        } else if (e.overlay.getPosition) {
            overlay = new MultiMarker();
            overlay.addMarker(e.overlay);
            overlay.setMap(komooMap.googleMap);
        } else if (e.overlay.getPath && !e.overlay.getPaths) {
            overlay = new MultiPolyline();
            overlay.addPolyline(e.overlay);
            overlay.setMap(komooMap.googleMap);
        } else {
            overlay = e.overlay;
        }
        if (overlay) {
            var feature = komoo.features.makeFeature({
                'properties': {
                    'userCanEdit': true,
                    'type': komooMap.type,
                    'name': 'sem nome',
                    'alwaysVisible': true
                },
                'geometry': {
                    'type': komooMap.drawingManager.getDrawingMode(),
                }
            });
            var geometry = feature.getGeometry();
            geometry.setObject(overlay);

            // Sets the custom image.
            feature.updateIcon(komooMap.googleMap.getZoom());

            komooMap.overlays.push(feature);
            komooMap.newOverlays.push(feature);
            // Listen events from drawn overlay.
            komooMap._attachOverlayEvents(feature);
            komooMap.setCurrentOverlay(feature);
            komooMap.setEditMode(komoo.EditMode.DRAW);
        }
        if (path) {
            // Emit changed event when edit paths.
            google.maps.event.addListener(path, "set_at", function() {
                komooMap._emit_changed();
            });
            google.maps.event.addListener(path, "insert_at", function() {
                komooMap._emit_changed();
            });
        }
        // Switch back to non-drawing mode after drawing a shape.
        komooMap.drawingManager.setDrawingMode(null);
        
        komooMap._emit_changed();
        return true;
    }