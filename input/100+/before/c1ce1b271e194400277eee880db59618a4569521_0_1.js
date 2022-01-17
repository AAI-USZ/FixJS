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

        this._tileLoadQueue.markInsertionPoint();

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

        console.log('Max Depth: ' + maxDepth);
        console.log('Tiles Visited: ' + tilesVisited);

        processTileLoadQueue(this, context, sceneState);
    }