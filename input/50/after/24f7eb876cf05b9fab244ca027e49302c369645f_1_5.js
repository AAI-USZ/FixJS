function() {
        this.map.unbind('change:zoom', this._setZoom, this);
        this.map.unbind('change:center', this._setCenter, this);
    }