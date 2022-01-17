function processTileLoadQueue(surface, context, sceneState) {
        var tileLoadQueue = surface._tileLoadQueue;
        var tile = tileLoadQueue.head;

        while (typeof tile !== 'undefined') {
            var i, len;

            if (tile.state === TileState.UNLOADED) {
                tile.state = TileState.TRANSITIONING;
                surface.terrain.requestTileGeometry(tile);

                for (i = 0, len = surface.imageryCollection.getLength(); i < len; ++i) {
                    var imageryLayer = surface.imageryCollection.get(i);
                    imageryLayer.createTileImagerySkeletons(tile, surface.terrain.tilingScheme);
                }
            }
            if (tile.state === TileState.RECEIVED) {
                tile.state = TileState.TRANSITIONING;
                surface.terrain.transformGeometry(context, tile);
            }
            if (tile.state === TileState.TRANSFORMED) {
                tile.state = TileState.TRANSITIONING;
                surface.terrain.createResources(context, tile);
            }
            // TODO: what about the FAILED and INVALID states?

            var doneLoading = tile.state === TileState.READY;

            var tileImageryCollection = tile.imagery;
            for (i = 0, len = tileImageryCollection.length; i < len; ++i) {
                var tileImagery = tileImageryCollection[i];
                var imageryProvider = tileImagery.imageryLayer.imageryProvider;

                if (tileImagery.state === TileState.UNLOADED) {
                    tileImagery.state = TileState.TRANSITIONING;
                    imageryProvider.requestImagery(tileImagery);
                }
                if (tileImagery.state === TileState.RECEIVED) {
                    tileImagery.state = TileState.TRANSITIONING;
                    imageryProvider.transformImagery(context, tileImagery);
                }
                if (tileImagery.state === TileState.TRANSFORMED) {
                    tileImagery.state = TileState.TRANSITIONING;
                    imageryProvider.createResources(context, tileImagery);
                }
                doneLoading = doneLoading && tileImagery.state === TileState.READY;
            }

            var next = tile._next;

            if (doneLoading) {
                tile.renderable = true;
                tile.doneLoading = true;
                tileLoadQueue.remove(tile);
            }

            tile = next;
        }
    }