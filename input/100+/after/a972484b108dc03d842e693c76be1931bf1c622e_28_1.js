function (layerInfo, mapInfo) {
        var size = layerInfo._layerSize;
        var tilesets = mapInfo.getTilesets();
        if (tilesets) {
            for (var i = tilesets.length - 1; i >= 0; i--) {
                var tileset = tilesets[i];
                if (tileset) {
                    for (var y = 0; y < size.height; y++) {
                        for (var x = 0; x < size.width; x++) {
                            var pos = x + size.width * y;
                            var gid = layerInfo._tiles[pos];
                            if (gid != 0) {
                                // Optimization: quick return
                                // if the layer is invalid (more than 1 tileset per layer) an cc.Assert will be thrown later
                                if (((gid & cc.FlippedMask)>>>0) >= tileset.firstGid) {
                                    return tileset;
                                }
                            }

                        }
                    }
                }
            }
        }

        // If all the tiles are 0, return empty tileset
        cc.log("cocos2d: Warning: TMX Layer " + layerInfo.name + " has no tiles");
        return null;
    }