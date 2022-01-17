function(context, tile) {
        TerrainProvider.createTileEllipsoidGeometryFromBuffers(context, tile, tile.transformedGeometry);
        tile.transformedGeometry = undefined;
        tile.state = TileState.READY;
    }