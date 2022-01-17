function () {
        this._super();
        var map = cc.TMXTiledMap.create("res/TileMaps/ortho-rotation-test.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);
        var s = map.getContentSize();
        cc.Log("ContentSize:" + s.width + "," + s.height);

        var action = cc.ScaleBy.create(2, 0.5);
        map.runAction(action);
    }