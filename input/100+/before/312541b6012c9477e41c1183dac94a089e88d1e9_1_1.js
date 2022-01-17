function() {
        _.bindAll(this, '_addLayer', '_setZoom', '_setCenter');
        cdb.geo.MapView.prototype.initialize.call(this);
        var self = this;
        
        this.map_leaflet = new L.Map(this.el);
        this.map.layers.bind('add', this._addLayer);
        this._bindModel();
        
        //set options
        this._setCenter(this.map, this.map.get('center'));
        this._setZoom(this.map, this.map.get('zoom'));

        this.map_leaflet.on('zoomend', function() {
            self._setModelProperty({zoom: self.map_leaflet.getZoom()});

        }, this);
        this.map_leaflet.on('drag', function () {
            var c = self.map_leaflet.getCenter();
            self._setModelProperty({center: [c.lat, c.lng]});
        }, this);
    }