function(vertices) {
            ++transformed;
            if ((transformed % 10) === 0) {
                console.log('transformed: ' + transformed);
            }

            tile.geometry = undefined;
            tile.transformedGeometry = {
                vertices : vertices,
                indices : TerrainProvider.getRegularGridIndices(width, height)
            };
            tile.state = TileState.TRANSFORMED;
        }