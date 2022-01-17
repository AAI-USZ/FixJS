function (bounds) {
        bounds = this.adjustBounds(bounds);
        var res = this.getServerResolution();
        var x = Math.round((bounds.left - this.tileOrigin.lon) / (res * this.tileSize.w));
        var y = Math.round((this.tileOrigin.lat - bounds.top) / (res * this.tileSize.h));
        var z = this.getZoomForResolution( res );

        var tileIndex = x + y * this.tierSizeInTiles[z].w + this.tileCountUpToTier[z];
        var path = "TileGroup" + Math.floor( (tileIndex) / 256 ) +
            "/" + z + "-" + x + "-" + y + ".jpg";
        var url = this.url;
        if (OpenLayers.Util.isArray(url)) {
            url = this.selectUrl(path, url);
        }
        return url + path;
    }