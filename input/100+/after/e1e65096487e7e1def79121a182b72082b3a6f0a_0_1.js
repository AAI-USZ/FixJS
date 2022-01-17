function(e) {
        this.fire('leafpileclick', {
            leafpile:   e.target,
            markers:    e.markers,
            zooming:    (e.markers.length > 1),
            cancelZoom: function() { e.cancel = true; }
        });
        if (e.cancel === true) return;

        // zoom in when multiple are clicked
        if (e.markers.length > 1) {
            var all = [];
            for (var i=0; i<e.markers.length; i++) {
                all.push(e.markers[i].getLatLng());
            }
            var bnds = new L.LatLngBounds(all);
            var zoom = Math.min(this._map.getBoundsZoom(bnds),
                this._map.getZoom() + this.options.maxZoomChange);
            this._map.setView(bnds.getCenter(), zoom);
        }
    }