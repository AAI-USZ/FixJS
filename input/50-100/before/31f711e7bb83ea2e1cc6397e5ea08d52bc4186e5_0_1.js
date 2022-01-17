function(radius) {
        if (radius == 0) return this.disable();
        this.options.radius = radius;

        // activate grouping
        this.enable();
        this._grouping = true;
        this._iteratePiles(this._map.removeLayer, this._map);
        this._leafpiles = {};
        this._iterateMarkers(this._pileMarker, this);
    }