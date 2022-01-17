function () {
        this._super();
        var map = cc.TMXTiledMap.create("Resources/TileMaps/orthogonal-test1.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        map.runAction(cc.ScaleBy.create(2, 0.5));
    }