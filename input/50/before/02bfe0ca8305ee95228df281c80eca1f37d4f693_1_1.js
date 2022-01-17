function(context, tile) {
        TerrainProvider.createTileEllipsoidGeometryFromBuffers(context, tile, tile.geometry);
        tile.state = TileState.READY;
    }