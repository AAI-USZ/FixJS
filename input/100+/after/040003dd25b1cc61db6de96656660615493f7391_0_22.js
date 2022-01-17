function (e, o) {
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
    }