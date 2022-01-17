function(transform) {
        var style = this.map.layerContainerDiv.style;
        var transformProperty = OpenLayers.Util.getVendorPrefixedDom("transform");
        if (transformProperty) {
            style[transformProperty] = transform;
        }
    }