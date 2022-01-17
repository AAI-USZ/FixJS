function () {
        this._super();
        var map = cc.TMXTiledMap.create("res/TileMaps/test-object-layer.tmx");
        this.addChild(map, -1, TAG_TILE_MAP);

        var s = map.getContentSize();
        cc.Log("ContentSize:" + s.width + "," + s.height);
        cc.Log("---. Iterating over all the group objets");
    }