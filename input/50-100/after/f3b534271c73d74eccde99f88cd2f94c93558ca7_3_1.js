function (layerName) {
        cc.Assert(layerName != null && layerName.length > 0, "Invalid layer name!");

        for (var i = 0; i < this._children.length; i++) {
            var layer = this._children[i];
            if (layer) {
                if (layer.getLayerName() == layerName) {
                    return layer;
                }
            }
        }

        // layer not found
        return null;
    }