function(context, sceneState) {
        if (typeof this._levelZeroTiles === 'undefined') {
            return;
        }

        var i, len;
        for (i = 0, len = this.imageryLayerCollection.getLength(); i < len; i++) {
            var imageryLayer = this.imageryLayerCollection.get(i);
            if (!imageryLayer.imageryProvider.ready) {
                return;
            }
        }

        maxDepth = 0;
        tilesVisited = 0;
        tilesCulled = 0;
        tilesRendered = 0;
        minimumTilesNeeded = 0;

        this._tileLoadQueue.markInsertionPoint();
        this._tileReplacementQueue.markStartOfRenderFrame();

        var cameraPosition = sceneState.camera.getPositionWC();
        this._occluder.setCameraPosition(cameraPosition);

        var levelZeroTiles = this._levelZeroTiles;
        for (i = 0, len = levelZeroTiles.length; i < len; ++i) {
            var tile = levelZeroTiles[i];
            if (!tile.doneLoading) {
                queueTileLoad(this, tile);
            }
            if (tile.renderable) {
                addBestAvailableTilesToRenderList(this, context, sceneState, tile);
            }
        }

        if (tilesVisited !== lastTilesVisited || tilesRendered !== lastTilesRendered ||
            tilesCulled !== lastTilesCulled || minimumTilesNeeded !== lastMinimumTilesNeeded ||
            maxDepth !== lastMaxDepth) {

            console.log('Visited ' + tilesVisited + ' Rendered: ' + tilesRendered + ' Culled: ' + tilesCulled + ' Needed: ' + minimumTilesNeeded + ' Max Depth: ' + maxDepth);

            lastTilesVisited = tilesVisited;
            lastTilesRendered = tilesRendered;
            lastTilesCulled = tilesCulled;
            lastMinimumTilesNeeded = minimumTilesNeeded;
            lastMaxDepth = maxDepth;
        }

        if (doit) {
            dumpTileStats(levelZeroTiles);
        }
        processTileLoadQueue(this, context, sceneState);
    }