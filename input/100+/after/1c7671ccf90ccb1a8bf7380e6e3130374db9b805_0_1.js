function(context, sceneState) {
        if (typeof this._levelZeroTiles === 'undefined') {
            return;
        }

        var i, len;
        for (i = 0, len = this.imageryCollection.getLength(); i < len; i++) {
            if (!this.imageryCollection.get(i).imageryProvider.ready) {
                return;
            }
        }

        maxDepth = 0;
        tilesVisited = 0;
        tilesCulled = 0;
        tilesRendered = 0;

        this._tileLoadQueue.markInsertionPoint();

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

        console.log('Visited ' + tilesVisited + ' Rendered: ' + tilesRendered + ' Culled: ' + tilesCulled + ' Max Depth: ' + maxDepth);

        processTileLoadQueue(this, context, sceneState);
    }