function(lat, lon, zoom)
        {
            _this.center(lat, lon);
            if (this.getZoom() <= 4) {
                _this.zoom(zoom);
            }
            _centerInitialized = true;
        }