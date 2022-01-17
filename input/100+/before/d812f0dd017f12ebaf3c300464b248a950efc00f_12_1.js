function () {
        this._super();
        var map = cc.TileMapAtlas.create(s_tilesPng, s_levelMapTga, 16, 16);
        map.getTexture().setAntiAliasTexParameters();

        var s = map.getContentSize();

        // If you are not going to use the Map, you can free it now
        // NEW since v0.7
        map.releaseMap();

        this.addChild(map, 0, TAG_TILE_MAP);

        map.setAnchorPoint(cc.ccp(0, 0.5));

        var scale = cc.ScaleBy.create(4, 0.8);
        var scaleBack = scale.reverse();

        var seq = cc.Sequence.create(scale, scaleBack, null);

        map.runAction(cc.RepeatForever.create(seq));
    }