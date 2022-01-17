function (e) {
        if (!komooMap.overlayView) {
            google.maps.event.trigger(komooMap.googleMap, "projection_changed");
        }
        var feature = komooMap.currentFeature;
        if (feature && feature.getProperties() &&
                feature.getProperties().userCanEdit) {
            komooMap.deleteNode(e);
        }
    }