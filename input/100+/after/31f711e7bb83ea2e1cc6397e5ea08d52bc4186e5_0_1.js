function(map) {
        this._map = map;
        this._map.on('zoomend', this._onZoomEnd, this);
        if (map.getZoom() > this.options.maxZoomLevel) {
            this._enabled = false;
            this._zoomDisabledMe = true;
        }

        // re-add markers (will not double-add since they're stamped)
        this._iterateMarkers(this.addMarker, this);
        return this;
    }