function() {
        this.map.bind('change:zoom', this._setZoom, this);
        this.map.bind('change:center', this._setCenter, this);
    }