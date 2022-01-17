function addBestAvailableTilesToRenderList(surface, context, sceneState, tile) {
        ++tilesVisited;

        surface._tileReplacementQueue.markTileRendered(tile);

        if (!isTileVisible(surface, sceneState, tile)) {
            ++tilesCulled;
            return;
        }

        if (tile.level > maxDepth) {
            maxDepth = tile.level;
        }

        // Algorithm #1: Don't load children unless we refine to them.
        if (screenSpaceError(surface, context, sceneState, tile) < surface.maxScreenSpaceError) {
            // This tile meets SSE requirements, so render it.
            surface._renderList.push(tile);
            ++tilesRendered;
            ++minimumTilesNeeded;
        } else if (queueChildrenLoadAndDetermineIfChildrenAreAllRenderable(surface, sceneState, tile)) {
            // SSE is not good enough and children are loaded, so refine.
            var children = tile.children;
            // PERFORMANCE_TODO: traverse children front-to-back
            var tilesRenderedBefore = tilesRendered;
            for (var i = 0, len = children.length; i < len; ++i) {
                addBestAvailableTilesToRenderList(surface, context, sceneState, children[i]);
            }
            if (tilesRendered !== tilesRenderedBefore) {
                ++minimumTilesNeeded;
            }
        } else {
            // SSE is not good enough but not all children are loaded, so render this tile anyway.
            surface._renderList.push(tile);
            ++tilesRendered;
            ++minimumTilesNeeded;
        }

        // Algorithm #2: Pre-load children of rendered tiles.
        /*if (screenSpaceError(surface, context, sceneState, tile) < surface.maxScreenSpaceError) {
            // This tile meets SSE requirements, so render it.
            surface._renderList.push(tile);
            ++tilesRendered;
            ++minimumTilesNeeded;
            queueChildrenLoadAndDetermineIfChildrenAreAllRenderable(surface, sceneState, tile);
        } else if (queueChildrenLoadAndDetermineIfChildrenAreAllRenderable(surface, sceneState, tile)) {
            // SSE is not good enough and children are loaded, so refine.
            var children = tile.children;
            // PERFORMANCE_TODO: traverse children front-to-back
            var tilesRenderedBefore = tilesRendered;
            for (var i = 0, len = children.length; i < len; ++i) {
                addBestAvailableTilesToRenderList(surface, context, sceneState, children[i]);
            }
            if (tilesRendered !== tilesRenderedBefore) {
                ++minimumTilesNeeded;
            }
        } else {
            // SSE is not good enough but not all children are loaded, so render this tile anyway.
            surface._renderList.push(tile);
            ++tilesRendered;
            ++minimumTilesNeeded;
        }*/

        // Algorithm #3: Pre-load children of all visited tiles
        /*if (queueChildrenLoadAndDetermineIfChildrenAreAllRenderable(surface, sceneState, tile)) {
            // All children are renderable.
            if (screenSpaceError(surface, context, sceneState, tile) < surface.maxScreenSpaceError) {
                surface._renderList.push(tile);
                ++tilesRendered;
                ++minimumTilesNeeded;
            } else {
                var children = tile.children;
                // PERFORMANCE_TODO: traverse children front-to-back
                var tilesRenderedBefore = tilesRendered;
                for (var i = 0, len = children.length; i < len; ++i) {
                    addBestAvailableTilesToRenderList(surface, context, sceneState, children[i]);
                }
                if (tilesRendered !== tilesRenderedBefore) {
                    ++minimumTilesNeeded;
                }
            }
        } else {
            // At least one child is not renderable, so render this tile.
            surface._renderList.push(tile);
            ++tilesRendered;
            ++minimumTilesNeeded;
        }*/
    }