function(mark, options) {
        var id = L.Util.stamp(mark);
        this._markers = {};
        this._markers[id] = mark;
        this._latlng = mark.getLatLng();
        L.Util.setOptions(this, options);
        this.options.icon = new L.Leafpile.Icon(1);
    }