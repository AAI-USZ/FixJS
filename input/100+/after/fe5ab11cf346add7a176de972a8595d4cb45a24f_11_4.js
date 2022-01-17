function () {
        this._super();
        var map = cc.TMXTiledMap.create("Resources/TileMaps/orthogonal-test3.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        map.setScale(0.2);
        map.setAnchorPoint(cc.ccp(0.5, 0.5));
    }