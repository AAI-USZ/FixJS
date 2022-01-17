function (e) {
        if (!komooMap.overlayView) {
            google.maps.event.trigger(komooMap.googleMap, "projection_changed");
        }
        var overlay = komooMap.currentOverlay;
        if (overlay && overlay.getProperties() &&
                overlay.getProperties().userCanEdit) {
            komooMap.deleteNode(e);
        }
    }