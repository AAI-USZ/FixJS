function(tile, geometryTilingScheme) {
        var imageryTilingScheme = this.imageryProvider.tilingScheme;

        var extent = tile.extent.intersectWith(this.imageryProvider.extent);
        //TODO: calculate level correctly
        var level = tile.level + 1;

        var northwestTileCoordinates = imageryTilingScheme.positionToTileXY(extent.getNorthwest(), level);
        var southeastTileCoordinates = imageryTilingScheme.positionToTileXY(extent.getSoutheast(), level);

        for ( var i = northwestTileCoordinates.x; i <= southeastTileCoordinates.x; i++) {
            for ( var j = northwestTileCoordinates.y; j <= southeastTileCoordinates.y; j++) {
                //TODO: compute texture translation and scale
                tile.imagery.push(new TileImagery(this, i, j, level));
            }
        }
    }