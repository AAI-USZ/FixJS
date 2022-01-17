function () {
        this._super();
        var map = cc.TMXTiledMap.create("Resources/TileMaps/orthogonal-test1.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var childrenArray = map.getChildren();
        for (var i = 0; i < childrenArray.length; i++) {
            var child = childrenArray[i];
            if (!child)
                break;
            //child.getTexture().setAntiAliasTexParameters();
        }
        map.runAction(cc.ScaleBy.create(2, 0.5));
    }