function addBestAvailableTilesToRenderList(surface, context, sceneState, tile) {
        if (!isTileVisible(surface, sceneState, tile)) {
            return;
        }

        if (tile.level > maxDepth)
            maxDepth = tile.level;
        ++tilesVisited;

        if (queueChildrenLoadAndDetermineIfChildrenAreAllRenderable(surface, tile)) {
            // All children are renderable.
            if (screenSpaceError(surface, context, sceneState, tile) < surface.maxScreenSpaceError) {
                surface._renderList.push(tile);
            } else {
                var children = tile.children;
                // PERFORMANCE_TODO: traverse children front-to-back
                for (var i = 0, len = children.length; i < len; ++i) {
                    addBestAvailableTilesToRenderList(surface, context, sceneState, children[i]);
                }
            }
        } else {
            // At least one child is not renderable, so render this tile.
            surface._renderList.push(tile);
        }
    }