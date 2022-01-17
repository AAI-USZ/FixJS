function(manager, tile) {
                    tile.element.src = theLayer.emptyImage;
                    theLayer.tiles[tile.element.id] = tile.element;
                    theLayer.positionTile(tile.element);
                }