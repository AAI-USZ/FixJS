function(tile, context, sceneState) {
        var camera = sceneState.camera;
        var frustum = camera.frustum;
        var pixelError = this.pixelError2D;
        var provider = this._dayTileProvider;

        var projection = sceneState.scene2D.projection;
        var viewport = context.getViewport();
        var viewportWidth = viewport.width;
        var viewportHeight = viewport.height;

        if (typeof provider === 'undefined') {
            return false;
        }

        if (tile.zoom < provider.zoomMin) {
            return true;
        }

        var texturePixelError = (pixelError > 0.0) ? pixelError : 1.0;

        var tileWidth, tileHeight;
        if (tile.texture && !tile.texture.isDestroyed()) {
            tileWidth = tile.texture.getWidth();
            tileHeight = tile.texture.getHeight();
        } else if (tile.image && typeof tile.image.width !== 'undefined') {
            tileWidth = tile.image.width;
            tileHeight = tile.image.height;
        } else {
            tileWidth = provider.tileWidth;
            tileHeight = provider.tileHeight;
        }

        var a = projection.project(new Cartographic3(tile.extent.west, tile.extent.north));
        var b = projection.project(new Cartographic3(tile.extent.east, tile.extent.south));
        var diagonal = a.subtract(b);
        var texelSize = Math.max(diagonal.x, diagonal.y) / Math.max(tileWidth, tileHeight);
        var pixelSize = Math.max(frustum.top - frustum.bottom, frustum.right - frustum.left) / Math.max(viewportWidth, viewportHeight);

        if (texelSize > pixelSize * texturePixelError) {
            return true;
        }

        return false;
    }