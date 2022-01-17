function(mark) {
        var id = L.Util.stamp(mark);
        delete this._markers[id];
        if (!this._map) return this;

        // remove from map or pile
        if (this._enabled) {
            for (var i in this._leafpiles) {
                this._leafpiles[i].removeMarker(mark);
            }
        }
        else {
            this._map.removeLayer(mark);
        }
        return this;
    }