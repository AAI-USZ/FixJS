function (feature) {
    var komooMap = this;
    if (feature.getPaths) {
        // Removes stroke from polygons.
        feature.setOptions({strokeWeight: 1.5});
    }

    google.maps.event.addListener(feature, "rightclick", function (e) {
        var feature_ = this;
        if (feature_.getProperties() && feature_.getProperties().userCanEdit &&
                feature_ == komooMap.currentFeature) {
            if (!komooMap.featureView) {
                google.maps.event.trigger(komooMap.googleMap, "projection_changed");
            }
            komooMap.deleteNode(e);
        }
    });

    google.maps.event.addListener(feature, "click", function (e, o) {
        var feature_ = this;
        if (window.console) console.log("Clicked on feature");
        if (komooMap.mode == komoo.Mode.SELECT_CENTER) {
            komooMap._emit_center_selected(e.latLng);
            return;
        }
        if (komooMap.addPanel.is(":visible") && feature_ != komooMap.currentFeature) {
            if (window.console) console.log("Clicked on unselected feature");
            if (!feature_.getProperties().userCanEdit) {
                return;
            }
        }
        if (komooMap.editMode == komoo.EditMode.DELETE && feature_.getProperties() &&
                feature_.getProperties().userCanEdit) {
            //komooMap.setCurrentFeature(null);
            var l = 0;
            if (feature_.getGeometryType() == komoo.GeometryType.POLYGON) {  // Clicked on polygon.
                var paths = feature_.getGeometry().getPaths();
                l = paths.getLength();
                paths.forEach(function (path, i) {
                    // Delete the correct path.
                    if (komoo.utils.isPointInside(e.latLng, path)) {
                        paths.removeAt(i);
                        l--;
                    }
                });
            } else if (feature_.getGeometryType() == komoo.GeometryType.MULTIPOINT) {
                var markers = feature_.getGeometry().getMarkers();
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
            if (l === 0) {  // We had only one path, or the feature wasnt a polygon.
                //feature_.setMap(null);
            } else {
                komooMap.setCurrentFeature(feature_);
            }
            // TODO: (IMPORTANT) Remove the feature from komooMap.features
            komooMap.setEditMode(null);
            komooMap._emit_changed();
        } else {
            komooMap.setEditMode(null);
            komooMap.setCurrentFeature(feature_);  // Select the clicked feature
            komooMap.closeTooltip();
            setTimeout(function () { komooMap.openInfoWindow({feature: feature_, position: e.latLng}) }, 200);
        }
    });

    google.maps.event.addListener(feature, "dblclick", function (e, o) {
        e.stop();
        var url = this.getUrl();
        if (url) {
            window.location = url;
        }
    });

    google.maps.event.addListener(feature, "mousemove", function (e) {
        if (komooMap.tooltip.feature == feature || komooMap.addPanel.is(":visible") ||
                !komooMap.options.enableInfoWindow) {
            return;
        }
        clearTimeout(komooMap.tooltip.timer);
        var delay = 0;
        if (feature.getProperties().type == "Community") {
            delay = 400;
        }
        komooMap.tooltip.timer = setTimeout(function () {
            if (komooMap.tooltip.isMouseover || komooMap.addPanel.is(":visible") || komooMap.mode == komoo.Mode.SELECT_CENTER) {
                return;
            }
            komooMap.openTooltip(feature, e.latLng);
        }, delay);
    });

    google.maps.event.addListener(feature, "mouseout", function (e) {
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