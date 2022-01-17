function() {
        if (arguments.length > 0) {
            var bounds = this.adjustBounds(arguments[0]);
            var res = this.map.getResolution();
            var x = Math.round((bounds.left - this.tileOrigin.lon) / (res * this.tileSize.w));
            var y = Math.round((this.tileOrigin.lat - bounds.top) / (res * this.tileSize.h));
            var z = this.map.getZoom();
            var w = this.standardTileSize;
            var h = this.standardTileSize;
            if (x == this.tierSizeInTiles[z].w -1 ) {
                var w = this.tierImageSize[z].w % this.standardTileSize;
            }
            if (y == this.tierSizeInTiles[z].h -1 ) {
                var h = this.tierImageSize[z].h % this.standardTileSize;
            }
            return (new OpenLayers.Size(w, h));
        } else {
            return this.tileSize;
        }
    }