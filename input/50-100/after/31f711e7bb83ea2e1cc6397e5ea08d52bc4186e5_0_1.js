function(mark) {
        var id = L.Util.stamp(mark);
        this._markers[id] = mark;
        if (!this._map) return this;

        // add to map or pile
        if (this._enabled) {
            this._pileMarker(mark);
        }
        else {
            this._map.addLayer(mark);
        }
        return this;
    }