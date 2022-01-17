function () {
        this._super();
        var map = cc.TMXTiledMap.create("res/TileMaps/orthogonal-test3.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();
        var childrenArray = map.getChildren();
        var child = null;
        for (var i = 0, len = childrenArray.length; i < len; i++) {
            child = childrenArray[i];

            if (!child)
                break;

            //child.getTexture().setAntiAliasTexParameters();
        }

        map.setScale(0.2);
        map.setAnchorPoint(cc.ccp(0.5, 0.5));
    }