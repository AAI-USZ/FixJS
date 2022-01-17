function () {
        this._super();
        var map = cc.TileMapAtlas.create(s_tilesPng, s_levelMapTga, 16, 16);
        // Create an Aliased Atlas
        map.getTexture().setAliasTexParameters();

        var s = map.getContentSize();
        cc.Log("ContentSize: " + s.width + " " + s.height);

        // If you are not going to use the Map, you can free it now
        // [tilemap releaseMap);
        // And if you are going to use, it you can access the data with:

        this.schedule(this.updateMap, 0.2);//:@selector(updateMap:) interval:0.2f);

        this.addChild(map, 0, TAG_TILE_MAP);

        map.setAnchorPoint(cc.ccp(0, 0));
        map.setPosition(cc.ccp(-20, -200));

    }