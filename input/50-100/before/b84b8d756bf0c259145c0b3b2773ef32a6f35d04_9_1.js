function () {
        var map = cc.TMXTiledMap.create("TileMaps/ortho-tile-property.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        for (var i = 1; i <= 20; i++) {
            cc.Log("GID:%i, Properties:%p", i, map.propertiesForGID(i));
        }
    }