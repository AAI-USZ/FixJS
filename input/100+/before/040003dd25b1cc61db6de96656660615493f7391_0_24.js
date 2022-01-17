function (overlay) {
    var komooMap = this;
    if (overlay.getPaths) {
        // Removes stroke from polygons.
        overlay.setOptions({strokeWeight: 1.5});
    }

    google.maps.event.addListener(overlay, "rightclick", function (e) {
        var overlay_ = this;
        if (overlay_.getProperties() && overlay_.getProperties().userCanEdit &&
                overlay_ == komooMap.currentOverlay) {
            if (!komooMap.overlayView) {
                google.maps.event.trigger(komooMap.googleMap, "projection_changed");
            }
            komooMap.deleteNode(e);
        }
    });

    google.maps.event.addListener(overlay, "click", function (e, o) {
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
    });

    google.maps.event.addListener(overlay, "dblclick", function (e, o) {
        e.stop();
        var url = this.getUrl();
        if (url) {
            window.location = url;
        }
    });

    google.maps.event.addListener(overlay, "mousemove", function (e) {
        if (komooMap.tooltip.overlay == overlay || komooMap.addPanel.is(":visible") ||
                !komooMap.options.enableInfoWindow) {
            return;
        }
        clearTimeout(komooMap.tooltip.timer);
        var delay = 0;
        if (overlay.getProperties().type == "Community") {
            delay = 400;
        }
        komooMap.tooltip.timer = setTimeout(function () {
            if (komooMap.tooltip.isMouseover || komooMap.addPanel.is(":visible") || komooMap.mode == komoo.Mode.SELECT_CENTER) {
                return;
            }
            komooMap.openTooltip(overlay, e.latLng);
        }, delay);
    });

    google.maps.event.addListener(overlay, "mouseout", function (e) {
        var delay = 0;
        clearTimeout(komooMap.tooltip.timer);
        //if (!komooMap.tooltip.isMouseover) {
            //komooMap.tooltip.timer = setTimeout(function () {
                //if (!komooMap.tooltip.isMouseover) {
                    komooMap.closeTooltip();
                //}
            //}, delay);
        //}
    });
}