function () {
    var komooMap = this;
    var controlsPosition = google.maps.ControlPosition.TOP_LEFT;

    this.drawingManagerOptions = {
        map: this.googleMap,
        drawingControl: false,
        drawingControlOptions: {
            position: controlsPosition,
            drawingModes: [
                komoo.OverlayType.POLYGON,
                komoo.OverlayType.POLYLINE,
                komoo.OverlayType.CIRCLE,
                komoo.OverlayType.POINT
            ]
        },
        polygonOptions: $.extend({
            clickable: true,
            editable: false,
            zIndex: 1
        }, this.options.overlayOptions),
        polylineOptions: $.extend({
            clickable: true,
            editable: false
        }, this.options.overlayOptions),
        circleOptions: {
            fillColor: "white",
            fillOpacity: 0.15,
            editable: true,
            zIndex: -1
        },
        drawingMode: komoo.OverlayType.POLYGON
    };
    this.drawingManager = new google.maps.drawing.DrawingManager(
            this.drawingManagerOptions);
    google.maps.event.addListener(this.drawingManager,
            "overlaycomplete", function (e) {
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
    });

    if (!this.options.defaultDrawingControl) {
        // Adds new HTML elements to the map.
        var polygonButton = komoo.createMapButton(gettext("Add shape"), gettext("Draw a shape"), function (e) {
            komooMap.setDrawingMode(komoo.OverlayType.POLYGON);
        }).attr("id", "map-add-" + komoo.OverlayType.POLYGON);

        var lineButton = komoo.createMapButton(gettext("Add line"), gettext("Draw a line"), function (e) {
            komooMap.setDrawingMode(komoo.OverlayType.POLYLINE);
        }).attr("id", "map-add-" + komoo.OverlayType.POLYLINE);

        var markerButton = komoo.createMapButton(gettext("Add point"), gettext("Add a marker"), function (e) {
            komooMap.setDrawingMode(komoo.OverlayType.POINT);
        }).attr("id", "map-add-" + komoo.OverlayType.POINT);

        var addMenu = komoo.createMapMenu(gettext("Add new..."), [polygonButton, lineButton, markerButton]);
        //this.editToolbar.append(addMenu);
        this.addItems = $(".map-container", addMenu);

        var addButton = komoo.createMapButton(gettext("Add"), gettext("Add another region"), function (e) {
            if (komooMap.editMode == komoo.EditMode.ADD) {
                komooMap.setEditMode(komoo.EditMode.DRAW);
            } else {
                komooMap.setEditMode(komoo.EditMode.ADD);
            }
            komooMap.drawingManager.setDrawingMode(komooMap.drawingMode[komooMap.drawingMode_]);
        });
        addButton.hide();
        addButton.attr("id", "komoo-map-add-button");
        this.editToolbar.append(addButton);

        var cutOutButton = komoo.createMapButton(gettext("Cut out"), gettext("Cut out a hole from a region"), function (e) {
            if (komooMap.editMode == komoo.EditMode.CUTOUT) {
                komooMap.setEditMode(komoo.EditMode.DRAW);
            } else {
                komooMap.setEditMode(komoo.EditMode.CUTOUT);
            }
            komooMap.drawingManager.setDrawingMode(komooMap.drawingMode[komooMap.drawingMode_]);
        });
        cutOutButton.hide();
        cutOutButton.attr("id", "komoo-map-cut-out-button");
        this.editToolbar.append(cutOutButton);

        var deleteButton = komoo.createMapButton(gettext("Delete"), gettext("Delete a region"), function (e) {
            if (komooMap.editMode == komoo.EditMode.DELETE) {
                komooMap.setEditMode(komoo.EditMode.DRAW);
            } else {
                komooMap.setEditMode(komoo.EditMode.DELETE);
            }
            komooMap.drawingManagerOptions.drawingMode = null;
            komooMap.drawingManager.setOptions(komooMap.drawingManagerOptions);
        });
        deleteButton.hide();
        deleteButton.attr("id", "komoo-map-delete-button");
        this.editToolbar.append(deleteButton);

        this.event.bind("editmode_changed", function(e, mode) {
            komooMap.closeInfoWindow();
            komooMap.closeTooltip();
            // Set the correct button style when editMode was changed.
            addButton.removeClass("active");
            cutOutButton.removeClass("active");
            deleteButton.removeClass("active");
            if (mode == "add") {
                addButton.addClass("active");
            } else if (mode == "cutout") {
                cutOutButton.addClass("active");
            } else if (mode == "delete") {
                deleteButton.addClass("active");
            }
        });
    }
}