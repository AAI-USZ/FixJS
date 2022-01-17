function getTileImagery(layer, tile) {
        var tileImagery = tile._imagery[layer._id];
        if (typeof tileImagery === 'undefined') {
            tileImagery = {
                tile : tile,
                state : TileState.UNLOADED
            };
            tile._imagery[layer._id] = tileImagery;
        }
        return tileImagery;
    }