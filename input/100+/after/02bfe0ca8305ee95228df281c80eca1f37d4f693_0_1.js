function processTileLoadQueue(surface, context, sceneState) {
        var tileLoadQueue = surface._tileLoadQueue;
        var tile = tileLoadQueue.head;

        var startTime = Date.now();
        var timeSlice = 10;
        var endTime = startTime + timeSlice;

        while (Date.now() < endTime && typeof tile !== 'undefined') {
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
            for (i = 0, len = tileImageryCollection.length; Date.now() < endTime && i < len; ++i) {
                var tileImagery = tileImageryCollection[i];
                var imageryLayer = tileImagery.imageryLayer;

                if (tileImagery.state === TileState.UNLOADED) {
                    tileImagery.state = TileState.TRANSITIONING;
                    imageryLayer.requestImagery(tileImagery);
                }
                if (tileImagery.state === TileState.RECEIVED) {
                    tileImagery.state = TileState.TRANSITIONING;
                    imageryLayer.transformImagery(context, tileImagery);
                }
                if (tileImagery.state === TileState.TRANSFORMED) {
                    tileImagery.state = TileState.TRANSITIONING;
                    imageryLayer.createResources(context, tileImagery);
                }
                doneLoading = doneLoading && tileImagery.state === TileState.READY;
            }

            var next = tile._next;

            if (i === len && doneLoading) {
                tile.renderable = true;
                tile.doneLoading = true;
                tileLoadQueue.remove(tile);
            }

            tile = next;
        }
    }