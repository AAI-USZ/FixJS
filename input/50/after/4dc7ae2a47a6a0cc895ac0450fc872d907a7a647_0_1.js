function(lat, lon, zoom)
        {
            _this.center(lat, lon);
            _this.zoom(zoom);
            _centerInitialized = true;
        }