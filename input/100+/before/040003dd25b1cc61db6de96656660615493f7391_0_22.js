function (e, o) {
        var overlay_ = this;
        if (window.console) console.log("Clicked on overlay");
        if (komooMap.mode == komoo.Mode.SELECT_CENTER) {
            komooMap._emit_center_selected(e.latLng);
            return;
        }
        if (komooMap.addPanel.is(":visible") && overlay_ != komooMap.currentOverlay) {
            if (window.console) console.log("Clicked on unselected overlay");
            if (!overlay_.getProperties().userCanEdit) {
                return;
            }
        }
        if (komooMap.editMode == komoo.EditMode.DELETE && overlay_.getProperties() &&
                overlay_.getProperties().userCanEdit) {
            //komooMap.setCurrentOverlay(null);
            var l = 0;
            if (overlay_.getGeometryType() == komoo.GeometryType.POLYGON) {  // Clicked on polygon.
                var paths = overlay_.getGeometry().getPaths();
                l = paths.getLength();
                paths.forEach(function (path, i) {
                    // Delete the correct path.
                    if (komoo.utils.isPointInside(e.latLng, path)) {
                        paths.removeAt(i);
                        l--;
                    }
                });
            } else if (overlay_.getGeometryType() == komoo.GeometryType.MULTIPOINT) {
                var markers = overlay_.getGeometry().getMarkers();
                l = markers.getLength();
                if (o) {
                    markers.forEach(function (marker, i) {
                        if (marker == o) {
                            markers.removeAt(i);
                            marker.setMap(null);
                            l--;
                        }
                    });
                }
            }
            if (l === 0) {  // We had only one path, or the overlay wasnt a polygon.
                //overlay_.setMap(null);
            } else {
                komooMap.setCurrentOverlay(overlay_);
            }
            // TODO: (IMPORTANT) Remove the overlay from komooMap.overlays
            komooMap.setEditMode(null);
            komooMap._emit_changed();
        } else {
            komooMap.setEditMode(null);
            komooMap.setCurrentOverlay(overlay_);  // Select the clicked overlay
            komooMap.closeTooltip();
            setTimeout(function () { komooMap.openInfoWindow(overlay_, e.latLng) }, 200);
        }
    }