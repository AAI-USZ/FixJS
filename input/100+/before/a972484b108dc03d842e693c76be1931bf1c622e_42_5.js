function () {
        this._super();
        var map = cc.TMXTiledMap.create("res/TileMaps/orthogonal-test6.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s1 = map.getContentSize();
        cc.Log("ContentSize:" + s1.width + "," + s1.height);

        var childs = map.getChildren();
        var node = null;
        for (var i = 0, len = childs.length; i < len; i++) {
            node = childs[i];
            if (!node) break;
            //node.getTexture().setAntiAliasTexParameters();
        }

        map.setAnchorPoint(cc.p(0, 0));
        var layer = map.layerNamed("Tile Layer 1");
        layer.setTileGID(3, cc.p(2, 2));
    }