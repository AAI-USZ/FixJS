function (layerInfo, mapInfo) {
        var size = layerInfo._layerSize;
        var tilesets = mapInfo.getTilesets();
        if (tilesets) {
            var tileset = null;
            for (var i = tilesets.length - 1; i >= 0; i--) {
                tileset = tilesets[i];
                if (tileset) {
                    for (var y = 0; y < size.height; y++) {
                        for (var x = 0; x < size.width; x++) {
                            var pos = (x + size.width * y).toString();
                            var gid = layerInfo._tiles[pos];
                            // XXX: gid == 0 --> empty tile
                            // Optimization: quick return
                            // if the layer is invalid (more than 1 tileset per layer) an cc.Assert will be thrown later
                            if (gid !== 0 && gid >= tileset.firstGid) {
                                return tileset;
                            }

                        }
                    }
                }
            }
        }

        // If all the tiles are 0, return empty tileset
        cc.Log("cocos2d: Warning: TMX Layer " + layerInfo.name + " has no tiles");
        return null;
    }