function(manager, tile) {
                    tile.src = theLayer.emptyImage;
                    theLayer.tiles[tile.id] = tile;
                    theLayer.positionTile(tile);
                }