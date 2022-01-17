function(result) {
            ++transformed;
            if ((transformed % 10) === 0) {
                console.log('transformed: ' + transformed);
            }

            tile.geometry = undefined;
            tile.transformedGeometry = {
                vertices : result.vertices,
                statistics : result.statistics,
                indices : TerrainProvider.getRegularGridIndices(width, height)
            };
            tile.state = TileState.TRANSFORMED;
        }