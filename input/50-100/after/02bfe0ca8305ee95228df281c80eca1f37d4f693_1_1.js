function(context, tile) {
        var tilingScheme = this.tilingScheme;
        var ellipsoid = tilingScheme.ellipsoid;
        var extent = tile.extent;

        var granularity = computeDesiredGranularity(tilingScheme, tile);

        // Determine the center for RTC rendering.
//        var center = ellipsoid.toCartesian(new Cartographic3(
//                (extent.east - extent.west) / 2.0,
//                (extent.north - extent.south) / 2.0,
//                0.0));
        // TODO: bounding sphere should be computed here, not by the tile.
        var center = tile.get3DBoundingSphere().center;

        // Create vertex and index buffers for this extent.
        // TODO: do this in a web worker?
        var buffers = ExtentTessellator.computeBuffers({
            ellipsoid : ellipsoid,
            extent : extent,
            granularity : granularity,
            generateTextureCoords : true,
            interleave : true,
            relativeToCenter : center
        });

        tile.transformedGeometry = buffers;
        tile.state = TileState.TRANSFORMED;
    }