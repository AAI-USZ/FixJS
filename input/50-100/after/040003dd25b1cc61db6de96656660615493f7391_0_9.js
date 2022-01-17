function (e) {
        var feature_ = this;
        if (feature_.getProperties() && feature_.getProperties().userCanEdit &&
                feature_ == komooMap.currentFeature) {
            if (!komooMap.featureView) {
                google.maps.event.trigger(komooMap.googleMap, "projection_changed");
            }
            komooMap.deleteNode(e);
        }
    }