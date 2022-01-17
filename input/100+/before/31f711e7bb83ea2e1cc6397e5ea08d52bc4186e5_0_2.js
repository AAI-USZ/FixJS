function(mark) {
        var point = this._map.latLngToLayerPoint(mark.getLatLng()),
            pile = null, leastDistance = null;
        for (var i in this._leafpiles) {
            var dist = this._leafpiles[i].inBounds(point);
            if (dist !== false && (!pile || dist < leastDistance)) {
                pile = this._leafpiles[i];
                leastDistance = dist;
            }
        }

        // add or create
        if (pile) {
            pile.addMarker(mark);
        }
        else {
            pile = new L.Leafpile.Marker(mark, {radius: this.options.radius});
            var id = L.Util.stamp(pile);
            this._leafpiles[id] = pile;
            this._leafpiles[id].on('click', this._onPileClick, this);
            this._map.addLayer(pile);
        }
        return this;
    }