function () {
        this._super();
        var map = cc.TMXTiledMap.create("Resources/TileMaps/iso-test-zorder.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();
        map.setPosition(cc.ccp(-s.width / 2, 0));

        this.tamara = cc.Sprite.create(s_pathSister1);
        map.addChild(this.tamara, map.getChildren().length);
        var mapWidth = map.getMapSize().width * map.getTileSize().width;
        this.tamara.setPosition(cc.POINT_PIXELS_TO_POINTS(cc.ccp(mapWidth / 2, 0)));
        this.tamara.setAnchorPoint(cc.ccp(0.5, 0));

        var move = cc.MoveBy.create(10, cc.ccpMult(cc.ccp(300, 250), 1 / cc.CONTENT_SCALE_FACTOR()));
        var back = move.reverse();
        var seq = cc.Sequence.create(move, back, null);
        this.tamara.runAction(cc.RepeatForever.create(seq));

        this.schedule(this.repositionSprite);
    }