function(lat, lon, zoom)
        {
            _this.center(lat, lon);

            if (this.getZoom() < 12) {
                _this.zoom(zoom);
            }

            _centerInitialized = true;
        }