function (layerName) {
        if (this._TMXLayers.hasOwnProperty(layerName)) {
            return this._TMXLayers[layerName];
        }
        return null;
    }