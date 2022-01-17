function(mark) {
        var id = L.Util.stamp(mark);
        this._markers[id] = mark;
        if (this._map) {
            if (this._grouping) this._pileMarker(mark);
            else this._map.addLayer(mark);
        }
        return this;
    }