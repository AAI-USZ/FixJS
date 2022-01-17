function(context, tile) {
        ++creating;
        if ((creating % 10) === 0) {
            console.log('creating: ' + creating);
        }

        var buffers = tile.transformedGeometry;
        tile.transformedGeometry = undefined;
        TerrainProvider.createTileEllipsoidGeometryFromBuffers(context, tile, buffers);
        tile.state = TileState.READY;
        ++ready;
        if ((ready % 10) === 0) {
            console.log('ready: ' + ready);
        }
    }