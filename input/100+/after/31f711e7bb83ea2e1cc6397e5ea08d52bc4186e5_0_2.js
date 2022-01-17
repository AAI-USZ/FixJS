function(e) {
        var zoom = this._map.getZoom();

        // check against max zoom level
        if (this._enabled && zoom > this.options.maxZoomLevel) {
            this.disable();
            this._zoomDisabledMe = true;
        }
        else if (zoom <= this.options.maxZoomLevel && this._zoomDisabledMe) {
            this.enable();
        }
        else if (this._enabled) {
            this._iteratePiles(this._map.removeLayer, this._map);
            this._leafpiles = {};
            this._iterateMarkers(this._pileMarker, this);
        }
    }