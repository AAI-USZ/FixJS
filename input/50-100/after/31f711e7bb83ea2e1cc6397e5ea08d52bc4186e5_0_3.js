function() {
        if (!this._enabled) {
            this._enabled = true;
            if (!this._map) return this;

            // check zoom level
            if (this._map.getZoom() > this.options.maxZoomLevel) return false;
            this._zoomDisabledMe = false;

            // remove markers, add piles
            this._iterateMarkers(this._map.removeLayer, this._map);
            this._iterateMarkers(this._pileMarker, this);
        }
        return this;
    }