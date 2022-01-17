function() {
        if (!this._grouping) {
            this._iterateMarkers(this._map.removeLayer, this._map);
            this._iteratePiles(this._map.addLayer, this._map);
            this._grouping = true;
        }
    }