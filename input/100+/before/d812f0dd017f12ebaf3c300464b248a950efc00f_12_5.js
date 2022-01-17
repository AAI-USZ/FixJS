function () {
        this._super();
        var map = cc.TMXTiledMap.create("res/TileMaps/orthogonal-test4.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var childrenArray = map.getChildren();
        var child = null;
        for (var i = 0, len = childrenArray.length; i < len; i++) {
            child = childrenArray[i];
            if (!child)
                break;

            //child.getTexture().setAntiAliasTexParameters();
        }

        map.setAnchorPoint(cc.ccp(0, 0));

        var layer = map.layerNamed("Layer 0");
        var s = layer.getLayerSize();

        var sprite;
        sprite = layer.tileAt(cc.ccp(0, 0));
        sprite.setScale(2);

        sprite = layer.tileAt(cc.ccp(s.width - 1, 0));
        sprite.setScale(2);

        sprite = layer.tileAt(cc.ccp(0, s.height - 1));
        sprite.setScale(2);

        sprite = layer.tileAt(cc.ccp(s.width - 1, s.height - 1));
        sprite.setScale(2);

        this.schedule(this.removeSprite, 2);
    }