function (e) {
        var overlay_ = this;
        if (overlay_.getProperties() && overlay_.getProperties().userCanEdit &&
                overlay_ == komooMap.currentOverlay) {
            if (!komooMap.overlayView) {
                google.maps.event.trigger(komooMap.googleMap, "projection_changed");
            }
            komooMap.deleteNode(e);
        }
    }