function(tile, geometryTilingScheme) {
        var imageryTilingScheme = this.imageryProvider.tilingScheme;

        var extent = tile.extent.intersectWith(this.imageryProvider.extent);
        //TODO: calculate level correctly
        var imageryLevel = tile.level + 1;

        var northwestTileCoordinates = imageryTilingScheme.positionToTileXY(extent.getNorthwest(), imageryLevel);
        var southeastTileCoordinates = imageryTilingScheme.positionToTileXY(extent.getSoutheast(), imageryLevel);

        // If the southeast corner of the extent lies very close to the north or west side
        // of the southeast tile, we don't actually need the southernmost or easternmost
        // tiles.
        // Similarly, if the northwest corner of the extent list very close to the south or east side
        // of the northwest tile, we don't actually need the northernmost or westnernmod tiles.
        // TODO: The northwest corner is especially sketchy...  Should we be doing something
        // elsewhere to ensure better alignment?
        // TODO: Is 1e-10 the right epsilon to use?
        var northwestTileExtent = imageryTilingScheme.tileXYToExtent(northwestTileCoordinates.x, northwestTileCoordinates.y, imageryLevel);
        if (Math.abs(northwestTileExtent.south - extent.north) < 1e-10) {
            ++northwestTileCoordinates.y;
        }
        if (Math.abs(northwestTileExtent.east - extent.west) < 1e-10) {
            ++northwestTileCoordinates.x;
        }

        var southeastTileExtent = imageryTilingScheme.tileXYToExtent(southeastTileCoordinates.x, southeastTileCoordinates.y, imageryLevel);
        if (Math.abs(southeastTileExtent.north - extent.south) < 1e-10) {
            --southeastTileCoordinates.y;
        }
        if (Math.abs(southeastTileExtent.west - extent.east) < 1e-10) {
            --southeastTileCoordinates.x;
        }

        if (northwestTileCoordinates.x !== southeastTileCoordinates.x ||
            northwestTileCoordinates.y !== southeastTileCoordinates.y) {
            console.log('too many tiles!');
        }

        for ( var i = northwestTileCoordinates.x; i <= southeastTileCoordinates.x; i++) {
            for ( var j = northwestTileCoordinates.y; j <= southeastTileCoordinates.y; j++) {
                //TODO: compute texture translation and scale
                tile.imagery.push(new TileImagery(this, i, j, imageryLevel));
            }
        }
    }